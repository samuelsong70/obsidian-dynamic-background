import { App } from 'obsidian';

// Add Star Sky dynamic background effect for dark theme
export function Add_StarSky(app: App){
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container=div_root.createEl("div", { cls: "rh-db-star-sky-container-0716" });

    container.createEl("div", { cls: "star-sky" });
  }
}

// Remove Star Sky dynamic background effect for dark theme
export function Remove_StarSky(app: App){
  let db_container = app.workspace.containerEl.find("div.workspace > div.mod-root > div.rh-db-star-sky-container-0716");
  if (db_container) {
    db_container.remove();
  }
};