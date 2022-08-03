import { App, Modal, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Add_StarSky, Remove_StarSky} from 'effects/dark-dynamic-star-sky';
import { Add_Snow, Remove_Snow} from 'effects/dark-dynamic-snow';
import { Add_Rain, Remove_Rain} from 'effects/dark-dynamic-rain';
import { Add_RandomCircle, Remove_RandomCircle} from 'effects/dark-dynamic-random-circle';
import { Add_RandomCircle_Light, Remove_RandomCircle_Light} from 'effects/light-dynamic-random-circle';
import { Add_Wave_Light, Remove_Wave_Light} from 'effects/light-dynamic-wave';
import { EffectEnum } from 'common';

interface DynamicBackgroundPluginSettings {
	dynamicEffect: EffectEnum;
	dynamicState: boolean;
}

const DEFAULT_SETTINGS: DynamicBackgroundPluginSettings = {
	dynamicEffect: EffectEnum.Dark_Dynamic_StarSky,
	dynamicState: true
}

export default class DynamicBackgroundPlugin extends Plugin {
	settings: DynamicBackgroundPluginSettings;
	prevDynamicEffect: EffectEnum;

	async onload() {
		console.log("loading dynamic background plugin...");

		this.prevDynamicEffect = EffectEnum.Unknown;

		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DynamicBackgroundSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			if(this.settings.dynamicState == true){
				this.AddDynamicBackground(this.settings.dynamicEffect);
			}
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log("unloading dynamic background plugin...");

		switch(this.settings.dynamicEffect)
		{
			case EffectEnum.Dark_Dynamic_RandomCircle:
				console.log("11111111...");
				Remove_RandomCircle(this.app);
				break;
			case EffectEnum.Light_Dynamic_RandomCircle:
				console.log("222222...");
				Remove_RandomCircle_Light(this.app);
				break;
			case EffectEnum.Light_Dynamic_Wave:
				console.log("333333...");
				Remove_Wave_Light(this.app);
				break;
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	AddDynamicBackground(effect: EffectEnum) {
		switch(effect){
			case EffectEnum.Dark_Dynamic_StarSky:
				Add_StarSky(app);
				break;
			case EffectEnum.Dark_Dynamic_Snow:
				Add_Snow(app);
				break;
			case EffectEnum.Dark_Dynamic_Rain:
				Add_Rain(app);
				break;
			case EffectEnum.Dark_Dynamic_RandomCircle:
				Add_RandomCircle(app);
				break;
			case EffectEnum.Light_Dynamic_RandomCircle:
				Add_RandomCircle_Light(app);
				break;
			case EffectEnum.Light_Dynamic_Wave:
				Add_Wave_Light(app);
				break;
		}
  };

	RemoveDynamicBackground(effect: EffectEnum){
		if (effect == EffectEnum.Unknown)
			return;

		switch(effect)
		{
			case EffectEnum.Dark_Dynamic_StarSky:
				Remove_StarSky(this.app);
				break;
			case EffectEnum.Dark_Dynamic_Snow:
				Remove_Snow(this.app);
				break;
			case EffectEnum.Dark_Dynamic_Rain:
				Remove_Rain(this.app);
				break;
			case EffectEnum.Dark_Dynamic_RandomCircle:
				Remove_RandomCircle(this.app);
				break;
			case EffectEnum.Light_Dynamic_RandomCircle:
				Remove_RandomCircle_Light(this.app);
				break;
			case EffectEnum.Light_Dynamic_Wave:
				Remove_Wave_Light(this.app);
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
			.setName('Dynamic Background State')
			.setDesc('Enable or disable dynamic background effect')
			.addToggle((tc) => 
				tc.setValue(this.plugin.settings.dynamicState)
				.onChange(async(value) => {
					this.plugin.settings.dynamicState = value;
					await this.plugin.saveSettings();

					if (this.plugin.settings.dynamicState==false){
						this.plugin.RemoveDynamicBackground(this.plugin.settings.dynamicEffect);
					}
					else{
						this.plugin.AddDynamicBackground(this.plugin.settings.dynamicEffect);
					}
				})
				)
		new Setting(containerEl)
			.setName('Dynamic Background Effect')
			.setDesc('Select a dynamic background effect')
			.addDropdown((dropdown) =>
        dropdown
          .addOption(EffectEnum.Dark_Dynamic_StarSky.toString(), "Dark Dynamic - Star Sky")
					.addOption(EffectEnum.Dark_Dynamic_Snow.toString(), "Dark Dynamic - Snow")
					.addOption(EffectEnum.Dark_Dynamic_Rain.toString(), "Dark Dynamic - Rain")
					.addOption(EffectEnum.Dark_Dynamic_RandomCircle.toString(), "Dark Dynamic - Random Circle")
					.addOption(EffectEnum.Light_Dynamic_RandomCircle.toString(), "Light Dynamic - Random Circle")
					.addOption(EffectEnum.Light_Dynamic_Wave.toString(), "Light Dynamic - Wave")
					.setValue(this.plugin.settings.dynamicEffect.toString())
          .onChange((value) => {
						this.plugin.prevDynamicEffect = this.plugin.settings.dynamicEffect;
            this.plugin.settings.dynamicEffect = Number(value); //value as any;
            this.plugin.saveData(this.plugin.settings);
            this.display();

						this.plugin.RemoveDynamicBackground(this.plugin.prevDynamicEffect);

						if (this.plugin.settings.dynamicState==true)
							this.plugin.AddDynamicBackground(this.plugin.settings.dynamicEffect);
          })
      );
	}
}
