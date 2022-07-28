import { App } from 'obsidian';

// Add Wave dynamic background effect for light theme
export function Add_Wave_Light(app: App){
  let effectScript: HTMLScriptElement;
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container = div_root.createEl("div", { cls: "rh-wave-db-light-theme-container-0723" });

    let styles=`
      div.rh-wave-db-light-theme-container-0723 {       
        position: absolute;
        z-index: -200;
        height: 100vh;
        width: 100% !important;
        overflow: hidden;
        padding:0;
        margin:0px;}
      div.rh-wave-db-light-theme-container-0723 {
        background: linear-gradient(0deg, rgba(255,255,255,1) 60%, rgba(201,233,255,1) 100%);
      }
      div.rh-wave-db-light-theme-container-0723 div.ocean{
        position:absolute;
        width:100%;
        min-height:100%;
        opacity: 20%;
        background-image: -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(0, rgb(0,150,150)),
        color-stop(0.50, rgb(0,150,255))
        );}
      .wave-0723{
        background:#a8bfca;
        display:inline-block;
        height:90%;
        width:10px;
        position:absolute;
        -webkit-animation-name:             dostuff; 
        -webkit-animation-duration:         10s; 
        -webkit-animation-iteration-count:  infinite;
        -webkit-transition-timing-function: ease-in-out;}
      @-webkit-keyframes dostuff{
        0%{
          height:90%;
        }
        50%{ 
          height:80%;
        }
        100%{ 
          height:90%;
        }}
    `;
    styleEl = container.createEl("style");
    styleEl.textContent = styles;

    container.createEl("div", { cls: "ocean" });

    let code = `
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
  }
}