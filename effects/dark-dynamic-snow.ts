import { App } from 'obsidian';

// Add Snow dynamic background effect for dark theme
export function Add_Snow(app: App){
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container=div_root.createEl("div", { cls: "snow-container-0719" });

    let styles=`
    div.snow-container-0719 {
      background: radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%);
      position: absolute;
      z-index: -200;
      height: 100vh;
      width: 100% !important;
      overflow: hidden;
      padding:0;
      margin:0px;}
    div.snow-container-0719 div.snow, div.snow-container-0719 div.snow:before, div.snow-container-0719 div.snow:after {
      position: absolute;
      top: -600px;
      left: 0;
      bottom: 0;
      right: 0;
      background-image: radial-gradient(4px 4px at 421px 141px, rgb(255, 255, 255) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 489px 152px, rgb(255, 255, 255) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 327px 403px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(6px 6px at 499px 194px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0)), radial-gradient(3px 3px at 288px 315px, rgba(255, 255, 255, 0.9) 50%, rgba(0, 0, 0, 0));
      background-size: 600px 600px;
      animation: sc-snow-animate 20s linear infinite;
      content: "";
      opacity: 0.5;}
    div.snow-container-0719 div.snow:after {
      margin-left: -200px;
      opacity: 0.4;
      animation-duration: 40s;
      animation-direction: reverse;
      filter: blur(3px);}
    div.snow-container-0719 div.snow:before {
      animation-duration: 60s;
      animation-direction: reverse;
      margin-left: -300px;
      opacity: 0.65;
      filter: blur(1.5px);}
    @keyframes sc-snow-animate {
        to {
          transform: translateY(600px);
        }
    }
    `;
    styleEl = container.createEl("style");
    styleEl.textContent = styles;

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