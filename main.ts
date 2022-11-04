import { App, Modal, Plugin, PluginSettingTab, Setting, FileSystemAdapter, normalizePath } from 'obsidian';
import { Add_StarSky, Remove_StarSky} from 'effects/dark-dynamic-star-sky';
import { Add_Snow, Remove_Snow, DarkTheme_Snow_Background_Property} from 'effects/dark-dynamic-snow';
import { Add_Rain, Remove_Rain, DarkTheme_Rain_Background_Property} from 'effects/dark-dynamic-rain';
import { Add_RandomCircle, Remove_RandomCircle, DarkTheme_Random_Circle_Background_Property} from 'effects/dark-dynamic-random-circle';
import { Add_RandomCircle_Light, Remove_RandomCircle_Light, LightTheme_Random_Circle_Background_Property} from 'effects/light-dynamic-random-circle';
import { Add_Wave_Light, Remove_Wave_Light, LightTheme_Wave_Background_Property} from 'effects/light-dynamic-wave';
import { DynamicEffectEnum } from 'common';
import { DynamicBackgroundPluginSettings } from 'common';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_SETTINGS: DynamicBackgroundPluginSettings = {
	dynamicEffect: DynamicEffectEnum.Dark_StarSky,
	enableDynamicEffect: true,
	backgroundImageFile:"",
	blur:0
} 

export default class DynamicBackgroundPlugin extends Plugin {
	settings: DynamicBackgroundPluginSettings;
	preDynamicEffect: DynamicEffectEnum;
	preBackgroudImageFile: boolean;
	dynamicBackgroundContainer: HTMLDivElement|null;
	wallpaperCover: HTMLDivElement;
	
	async onload() {
		console.log("loading dynamic background plugin...");

		this.preDynamicEffect = DynamicEffectEnum.Unknown;
		

		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DynamicBackgroundSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			this.AddDynamicBackgroundContainer();

			this.SetDynamicBackgroundContainerBgProperty();

			if(this.settings.enableDynamicEffect == true){
				this.AddDynamicBackgroundEffect(this.settings.dynamicEffect);
			}
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		//this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log("unloading dynamic background plugin...");

		this.RemoveDynamicBackgroundContainer();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	AddDynamicBackgroundContainer(){
		let styleEl:HTMLStyleElement;
  	let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");
		
		this.dynamicBackgroundContainer = null;

  	if (div_root) {
    	this.dynamicBackgroundContainer = div_root.createEl("div", { cls: "rh-obsidian-dynamic-background-container" });

			this.wallpaperCover = this.dynamicBackgroundContainer.createEl("div", { cls: "rh-wallpaper-cover" });

			this.SetWallpaperBlur();
  	}
	}

	SetWallpaperBlur(){
		let value = "blur("+this.settings.blur.toString()+"px)";
		this.wallpaperCover.style.setProperty("filter",value);
	}

	RemoveDynamicBackgroundContainer(){
		if (this.dynamicBackgroundContainer)
		{
			this.dynamicBackgroundContainer.remove();
			this.dynamicBackgroundContainer = null;
		}
	}

	async SetDynamicBackgroundContainerBgProperty(){
		if (this.dynamicBackgroundContainer == null)
			return;

		let backgroundImageAlreadySet = false;	
		let vaultBasePath: string;
		let imageFullFilename="";
		let buffer: Buffer;
		vaultBasePath = (this.app.vault.adapter as FileSystemAdapter).getBasePath();
		// Try absolute path
		try {
        let test = await fs.promises.readFile(this.settings.backgroundImageFile);
        buffer = test;
				
				imageFullFilename = "app://local/" + this.settings.backgroundImageFile;

    } catch(e) { }

		if (imageFullFilename=="")
		{
			//Try relative path
			try {
				let fileFullname = path.join(vaultBasePath, this.settings.backgroundImageFile);

				fileFullname = fileFullname.replace(/\\/g, "/");

				let test = await fs.promises.readFile(fileFullname);
				buffer = test;
				
				imageFullFilename = "app://local/" + fileFullname;

			} catch(e) { }
		}
		
		if (imageFullFilename!=""){
			this.dynamicBackgroundContainer.style.setProperty("background","url(\"" + imageFullFilename + "\"");
			this.dynamicBackgroundContainer.style.setProperty("background-size","cover");
			this.dynamicBackgroundContainer.style.setProperty("background-position","center");

			backgroundImageAlreadySet = true;
		}
		else{
			this.dynamicBackgroundContainer.style.removeProperty("background");
			this.dynamicBackgroundContainer.style.removeProperty("background-size");
			this.dynamicBackgroundContainer.style.removeProperty("background-position");
		}

		if (backgroundImageAlreadySet == false){
			this.dynamicBackgroundContainer.style.removeProperty("background");
			this.dynamicBackgroundContainer.style.removeProperty("background-size");
			this.dynamicBackgroundContainer.style.removeProperty("background-position");

			if(this.settings.enableDynamicEffect == false)
				return;

			switch(this.settings.dynamicEffect){
				case DynamicEffectEnum.Dark_StarSky:
					break;
				case DynamicEffectEnum.Dark_Snow:
					this.dynamicBackgroundContainer.style.setProperty("background", DarkTheme_Snow_Background_Property);
					break;
				case DynamicEffectEnum.Dark_Rain:
					this.dynamicBackgroundContainer.style.setProperty("background", DarkTheme_Rain_Background_Property);
					break;
				case DynamicEffectEnum.Dark_RandomCircle:
					this.dynamicBackgroundContainer.style.setProperty("background", DarkTheme_Random_Circle_Background_Property);
					break;
				case DynamicEffectEnum.Light_RandomCircle:
					this.dynamicBackgroundContainer.style.setProperty("background", LightTheme_Random_Circle_Background_Property);
					break;
				case DynamicEffectEnum.Light_Wave:
					this.dynamicBackgroundContainer.style.setProperty("background", LightTheme_Wave_Background_Property);
					break;
			}
		}
	}

	AddDynamicBackgroundEffect(effect: DynamicEffectEnum) {
		switch(effect){
			case DynamicEffectEnum.Dark_StarSky:
				if (this.dynamicBackgroundContainer)
					Add_StarSky(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_Snow:
				if (this.dynamicBackgroundContainer)
					Add_Snow(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_Rain:
				if (this.dynamicBackgroundContainer)
					Add_Rain(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_RandomCircle:
				if (this.dynamicBackgroundContainer)
					Add_RandomCircle(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Light_RandomCircle:
				if (this.dynamicBackgroundContainer)	
					Add_RandomCircle_Light(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Light_Wave:
				if (this.dynamicBackgroundContainer)
					Add_Wave_Light(this.dynamicBackgroundContainer);
				break;
		}
  };

	RemoveDynamicBackgroundEffect(effect:DynamicEffectEnum){
		if (effect == DynamicEffectEnum.Unknown)
			return;

		switch(effect)
		{
			case DynamicEffectEnum.Dark_StarSky:
				if (this.dynamicBackgroundContainer)
					Remove_StarSky(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_Snow:
				if (this.dynamicBackgroundContainer)
					Remove_Snow(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_Rain:
				if (this.dynamicBackgroundContainer)
					Remove_Rain(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Dark_RandomCircle:
				if (this.dynamicBackgroundContainer)
					Remove_RandomCircle(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Light_RandomCircle:
				if (this.dynamicBackgroundContainer)
					Remove_RandomCircle_Light(this.dynamicBackgroundContainer);
				break;
			case DynamicEffectEnum.Light_Wave:
				if (this.dynamicBackgroundContainer)
					Remove_Wave_Light(this.dynamicBackgroundContainer);
				break;
		}
  };
}

class DynamicBackgroundModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class DynamicBackgroundSettingTab extends PluginSettingTab {
	plugin: DynamicBackgroundPlugin;

	constructor(app: App, plugin: DynamicBackgroundPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Dynamic Background Plugin - Settings'});

		new Setting(containerEl)
			.setName('Dynamic Effect')
			.setDesc('Select a dynamic effect')
			.addDropdown((dropdown) =>
        dropdown
          .addOption(DynamicEffectEnum.Dark_StarSky.toString(), "Dark - Star Sky")
					.addOption(DynamicEffectEnum.Dark_Snow.toString(), "Dark - Snow")
					.addOption(DynamicEffectEnum.Dark_Rain.toString(), "Dark - Rain")
					.addOption(DynamicEffectEnum.Dark_RandomCircle.toString(), "Dark - Random Circle")
					.addOption(DynamicEffectEnum.Light_RandomCircle.toString(), "Light - Random Circle")
					.addOption(DynamicEffectEnum.Light_Wave.toString(), "Light - Wave")
					.setValue(this.plugin.settings.dynamicEffect.toString())
          .onChange(async (value) => {
						this.plugin.preDynamicEffect = this.plugin.settings.dynamicEffect;
            this.plugin.settings.dynamicEffect = Number(value);
            
						await this.plugin.saveSettings();

						this.plugin.RemoveDynamicBackgroundEffect(this.plugin.preDynamicEffect);

						if (this.plugin.settings.enableDynamicEffect == true)
							this.plugin.AddDynamicBackgroundEffect(this.plugin.settings.dynamicEffect);

						this.plugin.SetDynamicBackgroundContainerBgProperty();
          })
      );	

		new Setting(containerEl)
			.setName('Enable Dynamic Effect')
			.setDesc('Enable or disable dynamic effect')
			.addToggle((tc) => 
				tc.setValue(this.plugin.settings.enableDynamicEffect)
				.onChange(async(value) => {
					this.plugin.settings.enableDynamicEffect = value;
					
					await this.plugin.saveSettings();

					if (this.plugin.settings.enableDynamicEffect == false){
						this.plugin.RemoveDynamicBackgroundEffect(this.plugin.settings.dynamicEffect);
					}
					else{
						this.plugin.AddDynamicBackgroundEffect(this.plugin.settings.dynamicEffect);
					}
				})
			);				

			new Setting(containerEl)
			.setName('Static Wallpaper Image')
			.setDesc("This local image file. Use an absolute path or a path relative to the vault.")
			.addTextArea((text) =>
        text
					.setValue(this.plugin.settings.backgroundImageFile)
          .setPlaceholder("Example: C:\\Users\\Example\\Documents\\moon.jpg or /home/user/images/moon.jpg or attachments/moon.jpg" )
					.then((cb) => {
						cb.inputEl.style.width = "100%";
						cb.inputEl.rows = 5;
					})
          .onChange(async (value) => {
            this.plugin.settings.backgroundImageFile = value;

						await this.plugin.saveSettings();

						this.plugin.SetDynamicBackgroundContainerBgProperty();
					})
      );

			new Setting(containerEl)
			.setName('Blur')
			.setDesc('The blurriness of the wallpaper, 0 means no blur.')
			.addText((cb) =>
        cb
          .setValue(this.plugin.settings.blur.toString())
          .onChange(async (value) => {
            this.plugin.settings.blur = Number(value);

            await this.plugin.saveSettings();

						this.plugin.SetWallpaperBlur();
          })
			);
	}
}
