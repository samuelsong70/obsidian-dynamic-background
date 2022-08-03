import { App } from 'obsidian';

// Add Random Circle dynamic background effect for dark theme
export function Add_RandomCircle(app: App){
  let effectScript: HTMLScriptElement;
  let styleEl:HTMLStyleElement;
  let div_root = app.workspace.containerEl.find("div.workspace > div.mod-root");

  if (div_root) {
    let container = div_root.createEl("div", { cls: "rh-random-circle-db-container-0721" });

    container.createEl("canvas");

    let code = `
      var c;
      var grd;

      function startDarkDynamicRandomCircle() {
        var canvas = document.querySelector("div.rh-random-circle-db-container-0721 canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        c = canvas.getContext("2d");

        grd = c.createLinearGradient(0, window.innerHeight, 0, 0);

        c.fillStyle = grd;
        c.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        animateDarkDynamicRandomCircle();
      }

      function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.time = 0;
        this.lifespan = Math.random()*180 + 150;

        this.draw = function() {
          c.beginPath();
          c.arc(this.x, window.innerHeight - this.y, this.radius, 0, 2*Math.PI, false);
          var alpha = (this.lifespan - this.time)/this.lifespan;
          c.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
          c.stroke();
        }

        this.update = function() {
          if (this.time < this.lifespan) {
            this.radius += .25;
            this.time += 1;
            this.draw();
          }
        }
      }

      var fireworks = [];
      var time = 0;

      function animateDarkDynamicRandomCircle() {
        c.clearRect(0, 0, window.innerWidth, window.innerHeight);
        c.fillStyle = grd;
        c.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        if (time % Math.floor(Math.random()*100 + 40) == 0) {
          var x = Math.floor(Math.random()*window.innerWidth);
          var y = Math.floor(Math.random()*window.innerHeight);
          fireworks.push(new Firework(x, y));
        }

        fireworks.forEach(firework => {
          firework.update();
          if ((firework.time - firework.explosionTime) > 20) {
            for (var i = 0; i < fireworks.length; i++) {
              if (firework === fireworks[i]) {
                delete fireworks[i];
              }
            }
          }
        })
        
        time += 1;

        if (animateDarkDynamicRandomCircle)
          requestAnimationFrame(animateDarkDynamicRandomCircle);
      }

      startDarkDynamicRandomCircle();
    `
    effectScript = container.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Random Circle dynamic background effect for dark theme
export function Remove_RandomCircle(app: App){
  let db_container = app.workspace.containerEl.find("div.workspace > div.mod-root > div.rh-random-circle-db-container-0721");
  
  if (db_container) {
    db_container.remove();

    Unload_Dark_Dynamic_RandomCircle_Script();
  }
}

function Unload_Dark_Dynamic_RandomCircle_Script()
{
  window["startDarkDynamicRandomCircle"] = null;
  window["Firework"] = null;
  window["animateDarkDynamicRandomCircle"] = null;
}