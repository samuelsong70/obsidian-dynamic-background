import { App } from 'obsidian';

// Add Snow dynamic background effect for dark theme
export function Add_Snow(app: App){
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container=div_root.createEl("div", { cls: "snow-container-0719" });

    container.createEl("div", { cls: "snow" });
  }
}

// Remove Snow dynamic background effect for dark theme
export function Remove_Snow(app: App){
  let db_container = app.workspace.containerEl.find("div.workspace > div.mod-root > div.snow-container-0719");
  if (db_container) {
    db_container.remove();
  }
};