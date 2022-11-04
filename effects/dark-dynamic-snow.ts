export let DarkTheme_Snow_Background_Property = "radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%)";

// Add Snow dynamic background effect for dark theme
export function Add_Snow(dynamicBackgroundContainer: HTMLDivElement){
  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-dt-snow-dynamic-effect" });

    effect.createEl("div", { cls: "snow" });
  }
}

// Remove Snow dynamic background effect for dark theme
export function Remove_Snow(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-dt-snow-dynamic-effect");
  if (effect) {
    effect.remove();
  }
};