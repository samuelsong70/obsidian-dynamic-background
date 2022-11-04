export let LightTheme_Wave_Background_Property = "linear-gradient(0deg, rgba(255,255,255,1) 60%, rgba(201,233,255,1) 100%)";

// Add Wave dynamic background effect for light theme
export function Add_Wave_Light(dynamicBackgroundContainer: HTMLDivElement){
  let effectScript: HTMLScriptElement;

  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-lt-wave-effect" });

    effect.createEl("div", { cls: "ocean" });

    let code = `
      function showWave() {
        var ocean = document.querySelector("div.odb-lt-wave-effect div.ocean"),
        waveWidth = 10,
        waveCount = Math.floor(window.innerWidth/waveWidth),
        docFrag = document.createDocumentFragment();

        for(var i = 0; i < waveCount; i++){
          var wave = document.createElement("div");
          wave.className += " wave-0723";
          docFrag.appendChild(wave);
          wave.style.left = i * waveWidth + "px";
          wave.style.webkitAnimationDelay = (i/100) + "s";
        }

        ocean.appendChild(docFrag);
      }

      showWave();
    `;
    effectScript = effect.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Wave dynamic background effect for dark theme
export function Remove_Wave_Light(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-lt-wave-effect");
  if (effect) {
    effect.remove();
  }

  Unload_Effect_Script();
}

function Unload_Effect_Script(){
  window["showWave"] = null;
}