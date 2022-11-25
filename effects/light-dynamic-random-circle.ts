export let LightTheme_Random_Circle_Background_Property = "linear-gradient(0deg, rgba(255,255,255,1) 62%, rgba(230,244,255,1) 100%)";

// Add Random Circle dynamic background effect for light theme
export function Add_RandomCircle_Light(dynamicBackgroundContainer: HTMLDivElement){
  let effectScript: HTMLScriptElement;

  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-lt-random-circle-dynamic-effect" });

    effect.createEl("canvas");

    let code = `
      var odb_random_circle_ctx;
      var odb_random_circle_grd;

      function Obsidian_Dynamic_Background_Start() {
        var canvas = document.querySelector("div.odb-lt-random-circle-dynamic-effect canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        odb_random_circle_ctx = canvas.getContext("2d");

        odb_random_circle_grd = odb_random_circle_ctx.createLinearGradient(0, window.innerHeight, 0, 0);

        odb_random_circle_ctx.fillStyle = odb_random_circle_grd;
        odb_random_circle_ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        Obsidian_Dynamic_Background_Animate();
      }

      function Obsidian_Dynamic_Background_Firework(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.time = 0;
        this.lifespan = Math.random()*180 + 150;

        this.draw = function() {
          odb_random_circle_ctx.beginPath();
          odb_random_circle_ctx.arc(this.x, window.innerHeight - this.y, this.radius, 0, 2*Math.PI, false);
          var alpha = (this.lifespan - this.time)/this.lifespan;
          odb_random_circle_ctx.strokeStyle = "rgba(0, 128, 255, " + alpha + ")";
          odb_random_circle_ctx.stroke();
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

      function Obsidian_Dynamic_Background_Animate() {
        odb_random_circle_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        odb_random_circle_ctx.fillStyle = odb_random_circle_grd;
        odb_random_circle_ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        
        if (time % Math.floor(Math.random()*100 + 40) == 0) {
          var x = Math.floor(Math.random()*window.innerWidth);
          var y = Math.floor(Math.random()*window.innerHeight);
          fireworks.push(new Obsidian_Dynamic_Background_Firework(x, y));
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

        if (Obsidian_Dynamic_Background_Animate)
          requestAnimationFrame(Obsidian_Dynamic_Background_Animate);
      }

      Obsidian_Dynamic_Background_Start();
    `
    effectScript = effect.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Random Circle dynamic background effect for light theme
export function Remove_RandomCircle_Light(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-lt-random-circle-dynamic-effect");
  if (effect) {
    effect.remove();
  }

  Unload_Effect_Script();
}

function Unload_Effect_Script(){
  window["Obsidian_Dynamic_Background_Start"] = null;
  window["Obsidian_Dynamic_Background_Firework"] = null;
  window["Obsidian_Dynamic_Background_Animate"] = null;
}