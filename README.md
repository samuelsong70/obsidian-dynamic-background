# Dynamic Background Plugin

An [Obsidian](https://obsidian.md) plugin for adding dynamic effects and/or static wallpapers for Obsidian background.

## Features

- Adding dynamic effects for Obsidian background.
- Adding static wallpapers for Obsidian background.
- Adding dynamic effects and static wallpapers for Obsidian background. 

This plugin provides the following dynamic effects:

- 5 dynamic effects for Obsidian dark theme
  - Matrix / Digital Rain
  - Rain
  - Random Circle
  - Snow
  - Star Sky
- 2 dynamic effects for Obsidian light theme
  - Random Circle
  - Wave

> **Note:** Please report any bugs or needs by opening a new issue on GitHub.

## Demo

### Matrix / Digital Rain dynamic effect

![Digital rain dynamic effect](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/digital-rain-dark-effect.gif)

### Rain dynamic effect

![Rain dynamic effect](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/rain-effect.gif)

### Rain dynamic effect with wallpaper

![Rain dynamic effect with wallpaper](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/rain-effect-with-wallpaper.gif)

### Snow dynamic effect

![Snow dynamic effect](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/snow-effect.gif)

### Snow dynamic effect with wallpaper

![Snow dynamic effect with wallpaper](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/snow-effect-with-wallpaper.gif)


### Wave dynamic effect

![Wave dynamic effect](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wave-effect.gif)

### Wave dynamic effect with wallpaper

![Wave dynamic effect with wallpaper](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wave-effect-with-wallpaper.gif)

### Wallpaper demo 1

![Wallpaper demo 1](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wallpaper-demo-1.png)

### Wallpaper demo 2

![Wallpaper demo 2](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wallpaper-demo-3.png)


## How to use

### Open setting window

- Click the `Settings` button on the left toolbar
- Slide the scroll bar in the pop-up dialog and click `Dynamic Background` in the Community Plugins group

Please see the video below for details:

![Blue Sky](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/open-plugin-settings-window.gif)

### Enable or Disable dynamic effect

Dynamic effect can be enabled or disabled at any time:

- [Open the plugin's settings window](#open-setting-window)
- Close the `Enable Dynamic Effect` switch

### Select dynamic effect

There are a variety of dynamic effects to choose from, please choose a dynamic effect according to your `Base theme` setting. You can set the `Base theme` or `Base color scheme` by following the steps below.

- Click the `Settings` button on the left toolbar
- Click the `Appearance` button (As shown in the figure below, number 1)
- Select a theme as you need (as shown in the figure below, number 2)

![Select Obsidian Base Theme](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/select-obsidian-base-theme.jpg)


If your `Base theme` or `Base color scheme` setting is **Dark**, you should choose a dynamic effect from the Dark series. If your `Base theme` or `Base color scheme` setting is **Light**, you should choose a dynamic effect from the Light series.

The steps to select a dynamic effect are as follows:

- [Open the plugin's settings window](#open-setting-window)
- Select a effect from the `Dynamic Effect` drop-down box

### Select wallpaper image file

You can use an absolute path or a relative path to specify a local image file as the wallpaper.

- Windows system absolute path example: `e:\\images\\d.jpg`, pay attention to use double slashes
- Linux system absolute path example: `/home/user/images/moon.jpg`
- Relative path example: `attachments/moon.jpg`

> **Note:** Sometimes you may just want to display the wallpaper without the dynamic effect, just turn off the `Enable Dynamic Effect` switch in the settings window.

### Set wallpaper blur

[Open the plugin's settings window](#open-setting-window), Set the blur value, 0 means no blur. The blur effect is shown as follows:

**Blur: 0**

![Wallpaper blur 0](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wallpaper-blur-0.png)

**Blur: 5**

![Wallpaper blur 5](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wallpaper-blur-5.png)

**Blur: 10**

![Wallpaper blur 10](https://raw.githubusercontent.com/samuelsong70/obsidian-dynamic-background/master/assets/wallpaper-blur-10.png)

## How to Install

### From within Obsidian

From Obsidian, you can activate this plugin within Obsidian by doing the following:

- Open Settings > Community plugins
- Make sure Restricted mode is **off**
- Click Browse community plugins
- Search for "Dynamic Background"
- Click Install
- Once installed, close the community plugins window and activate the newly installed plugin

### From GitHub

- Download `main.js`, `manifest.json`, `styles.css` from the Releases section of the GitHub Repository.
- Create `obsidian-dynamic-background` folder under `<vault>/.obsidian/plugins/` folder.
- Copy downloaded files to `<vault>/.obsidian/plugins/obsidian-dynamic-background/` folder.  
  
  >Note: On some machines the `.obsidian` folder may be hidden. On MacOS you should be able to press `Command+Shift+Dot` to show the folder in Finder.

- Reload Obsidian

## Version History

### 1.0.4

- Improved Matrix / Digital Rain dynamic effect.

### 1.0.3

- Add Matrix / Digital Rain dynamic effect for Obsidian dark theme.

### 1.0.2

- Initial version

## Support

This plugin is provided to everyone for free. 

If you like this plugin, welcome to support us. I will keep improving this plugin to make it better and better.

<a href="https://www.buymeacoffee.com/samuelsong"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=codetab&button_colour=e3e7ef&font_colour=262626&font_family=Inter&outline_colour=262626&coffee_colour=ff0000"></a>

