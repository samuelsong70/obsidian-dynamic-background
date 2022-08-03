import { App } from 'obsidian';

// Add Wave dynamic background effect for light theme
export function Add_Wave_Light(app: App){
  let effectScript: HTMLScriptElement;
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container = div_root.createEl("div", { cls: "rh-wave-db-light-theme-container-0723" });

    container.createEl("div", { cls: "ocean" });

    let code = `
      function showWave() {
        var ocean = document.querySelector("div.rh-wave-db-light-theme-container-0723 div.ocean"),
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
    effectScript = container.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Wave dynamic background effect for dark theme
export function Remove_Wave_Light(app: App){
  let db_container = app.workspace.containerEl.find("div.workspace > div.mod-root > div.rh-wave-db-light-theme-container-0723");
  
  if (db_container) {
    db_container.remove();

    Unload_Light_Dynamic_Wave_Script();
  }
}

function Unload_Light_Dynamic_Wave_Script(){
  window["showWave"] = null;
}