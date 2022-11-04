export let DarkTheme_Random_Circle_Background_Property = "radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%)";

// Add Random Circle dynamic background effect for dark theme
export function Add_RandomCircle(dynamicBackgroundContainer: HTMLDivElement){
  let effectScript: HTMLScriptElement;

  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-dt-random-circle-dynamic-effect" });

    effect.createEl("canvas");

    let code = `
      var c;
      var grd;

      function startDarkDynamicRandomCircle() {
        var canvas = document.querySelector("div.odb-dt-random-circle-dynamic-effect canvas");
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
    effectScript = effect.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Random Circle dynamic background effect for dark theme
export function Remove_RandomCircle(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-dt-random-circle-dynamic-effect");
  if (effect) {
    effect.remove();
  }

  Unload_Effect_Script();
}

function Unload_Effect_Script()
{
  window["startDarkDynamicRandomCircle"] = null;
  window["Firework"] = null;
  window["animateDarkDynamicRandomCircle"] = null;
}