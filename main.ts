import { App, Modal, Plugin, PluginSettingTab, Setting, FileSystemAdapter, normalizePath } from 'obsidian';
import { Add_StarSky, Remove_StarSky} from 'effects/dark-dynamic-star-sky';
import { Add_Snow, Remove_Snow, DarkTheme_Snow_Background_Property} from 'effects/dark-dynamic-snow';
import { Add_Rain, Remove_Rain, DarkTheme_Rain_Background_Property} from 'effects/dark-dynamic-rain';
import { Add_RandomCircle, Remove_RandomCircle, DarkTheme_Random_Circle_Background_Property} from 'effects/dark-dynamic-random-circle';
import { Add_RandomCircle_Light, Remove_RandomCircle_Light, LightTheme_Random_Circle_Background_Property} from 'effects/light-dynamic-random-circle';
import { Add_Wave_Light, Remove_Wave_Light, LightTheme_Wave_Background_Property} from 'effects/light-dynamic-wave';
import { Add_DigitalRain, Remove_DigitalRain, DarkTheme_Digital_Rain_Background_Property, SetBrightness} from 'effects/dark-dynamic-digital-rain';
import { DynamicEffectEnum } from 'common';
import { DynamicBackgroundPluginSettings } from 'common';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_SETTINGS: DynamicBackgroundPluginSettings = {
	dynamicEffect: DynamicEffectEnum.Dark_StarSky,
	digitalRainBrightness: 0.7,
	enableDynamicEffect: true,
	backgroundImageFile:"",
	blur:0,
	brightness:100,
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
  	let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");
		
		this.dynamicBackgroundContainer = null;

  	if (div_root) {

		window.addEventListener('blur', () => {
			if (this.settings.enableDynamicEffect == true) {
				this.RemoveDynamicBackgroundEffect(this.settings.dynamicEffect);
			}
		});
		window.addEventListener('focus', () => {
			if (this.settings.enableDynamicEffect == true) {
				this.RemoveDynamicBackgroundEffect(this.settings.dynamicEffect);
				this.AddDynamicBackgroundEffect(this.settings.dynamicEffect);
			}
		});
    	this.dynamicBackgroundContainer = div_root.createEl("div", { cls: "rh-obsidian-dynamic-background-container" });

			this.wallpaperCover = this.dynamicBackgroundContainer.createEl("div", { cls: "rh-wallpaper-cover" });

			this.updateWallpaperStyles();
  	}
	}

	updateWallpaperStyles(){
		let value = "blur("+this.settings.blur.toString()+"px) brightness("+this.settings.brightness.toString()+"%)";
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
		let imageFullFilename="";

		try {
            imageFullFilename = this.app.vault.adapter.getResourcePath(this.settings.backgroundImageFile)

        } catch(e) { }
		
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
				case DynamicEffectEnum.Dark_DigitalRain:
					this.dynamicBackgroundContainer.style.setProperty("background", DarkTheme_Digital_Rain_Background_Property);
			}
		}
	}

	SetDigitalRainBrightnessHelper(){
		if (this.dynamicBackgroundContainer){
			SetBrightness(this.dynamicBackgroundContainer, this.settings.digitalRainBrightness);
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
			case DynamicEffectEnum.Dark_DigitalRain:
				if (this.dynamicBackgroundContainer)
				{
					Add_DigitalRain(this.dynamicBackgroundContainer);
					this.SetDigitalRainBrightnessHelper();
				}
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
			case DynamicEffectEnum.Dark_DigitalRain:
				if (this.dynamicBackgroundContainer)
					Remove_DigitalRain(this.dynamicBackgroundContainer);
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
					.addOption(DynamicEffectEnum.Dark_DigitalRain.toString(), "Dark - Matrix / Digital Rain")
					.addOption(DynamicEffectEnum.Dark_Rain.toString(), "Dark - Rain")
					.addOption(DynamicEffectEnum.Dark_RandomCircle.toString(), "Dark - Random Circle")
					.addOption(DynamicEffectEnum.Dark_Snow.toString(), "Dark - Snow")
					.addOption(DynamicEffectEnum.Dark_StarSky.toString(), "Dark - Star Sky")
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

						this.display();
          })
      );	

		if (this.plugin.settings.dynamicEffect == DynamicEffectEnum.Dark_DigitalRain)
		{
			new Setting(containerEl)
			.setName("Brightness")
			.setDesc("Set Digital Rain Brightness.")
			.addSlider(tc => {
				tc.setDynamicTooltip()
					.setLimits(0.50, 1, 0.01)
					.setValue(this.plugin.settings.digitalRainBrightness)
					.onChange(async value => {
						this.plugin.settings.digitalRainBrightness = value;
						this.plugin.SetDigitalRainBrightnessHelper();

						await this.plugin.saveSettings();
					});
			});	
		}

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
			.setDesc("Image file in Vault. Please use the relative path of the image file inside Vault.")
			.addTextArea((text) =>
        text
					.setValue(this.plugin.settings.backgroundImageFile)
          .setPlaceholder("Example: attachments/moon.jpg or wallpapers/green.png" )
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
			.addSlider(tc => {
				tc.setDynamicTooltip()
					.setLimits(0, 100, 1)
					.setValue(this.plugin.settings.blur)
					.onChange(async value => {
						this.plugin.settings.blur = value;

						await this.plugin.saveSettings();

						this.plugin.updateWallpaperStyles();
					});
			});	

			new Setting(containerEl)
			.setName('Brightness')
			.setDesc('The Brightness of the wallpaper.')
			.addSlider(tc => {
				tc.setDynamicTooltip()
					.setLimits(0, 200, 1)
					.setValue(this.plugin.settings.brightness)
					.onChange(async value => {
						this.plugin.settings.brightness = value;

						await this.plugin.saveSettings();

						this.plugin.updateWallpaperStyles();
					});
			});	
	}
}
