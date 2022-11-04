// Add Star Sky dynamic background effect for dark theme
export function Add_StarSky(dynamicBackgroundContainer: HTMLDivElement){
  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-dt-star-sky-dynamic-effect" });

    effect.createEl("div", { cls: "star-sky" });
  }
}

// Remove Star Sky dynamic background effect for dark theme
export function Remove_StarSky(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-dt-star-sky-dynamic-effect");
  if (effect) {
    effect.remove();
  }
};