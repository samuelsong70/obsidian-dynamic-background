import { App } from 'obsidian';

// Add Random Circle dynamic background effect for dark theme
export function Add_RandomCircle(app: App){
  let effectScript: HTMLScriptElement;
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container = div_root.createEl("div", { cls: "rh-random-circle-db-container-0721" });

    let styles=`
      div.rh-random-circle-db-container-0721 {
        background: radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%);
        position: absolute;
        z-index: -200;
        height: 100vh;
        width: 100% !important;
        overflow: hidden;
        padding:0;
        margin:0px;
    `;
    styleEl = container.createEl("style");
    styleEl.textContent = styles;

    container.createEl("canvas");

    let code = 'var c,grd;function init(){var i=document.querySelector("div.rh-random-circle-db-container-0721 canvas");i.width=window.innerWidth,i.height=window.innerHeight,c=i.getContext("2d"),grd=c.createLinearGradient(0,window.innerHeight,0,0),c.fillStyle=grd,c.fillRect(0,0,window.innerWidth,window.innerHeight),animate()}function Firework(i,t){this.x=i,this.y=t,this.radius=5,this.time=0,this.lifespan=180*Math.random()+50,this.draw=function(){c.beginPath(),c.arc(this.x,window.innerHeight-this.y,this.radius,0,2*Math.PI,!1);var i=(this.lifespan-this.time)/this.lifespan;c.strokeStyle="rgba(255, 255, 255, "+i+")",c.stroke()},this.update=function(){this.time<this.lifespan&&(this.radius+=.25,this.time+=1,this.draw())}}var fireworks=[],time=0;function animate(){if(c.clearRect(0,0,window.innerWidth,window.innerHeight),c.fillStyle=grd,c.fillRect(0,0,window.innerWidth,window.innerHeight),time%Math.floor(100*Math.random()+40)==0){var i=Math.floor(Math.random()*window.innerWidth),t=Math.floor(Math.random()*window.innerHeight);fireworks.push(new Firework(i,t))}fireworks.forEach((i=>{if(i.update(),i.time-i.explosionTime>20)for(var t=0;t<fireworks.length;t++)i===fireworks[t]&&delete fireworks[t]})),time+=1,requestAnimationFrame(animate)}init();';
    effectScript = container.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Random Circle dynamic background effect for dark theme
export function Remove_RandomCircle(app: App){
  let db_container = app.workspace.containerEl.find("div.workspace > div.mod-root > div.rh-random-circle-db-container-0721");
  if (db_container) {
    db_container.remove();
  }
};