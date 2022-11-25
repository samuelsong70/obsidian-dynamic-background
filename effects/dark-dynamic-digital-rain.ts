export let DarkTheme_Digital_Rain_Background_Property = "radial-gradient(ellipse at bottom, #1b2735 20%, #090a0f 100%)";

// Add Digital Rain dynamic background effect for dark theme
export function Add_DigitalRain(dynamicBackgroundContainer: HTMLDivElement){
  let effectScript: HTMLScriptElement;

  if (dynamicBackgroundContainer) {
    let effect = dynamicBackgroundContainer.createEl("div", { cls: "odb-dt-digital-rain-dynamic-effect" });

    effect.createEl("canvas");

    let code = `
      var odb_digital_rain_canvas
      var odb_digital_rain_ctx;
      var odb_digital_rain_grd;
      var odb_digital_rain_digitals = "1001101010110101010101010010101010101011101111010101010110101010101010101110010101";
      var odb_digital_rain_font_size = 15;
      var odb_digital_rain_columns;    //number of columns for the rain
      var odb_digital_rain_drops = []; //an array of drops - one per column
      var odb_digital_rain_interval;

      function Obsidian_Dynamic_Background_Draw(){
        odb_digital_rain_ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        odb_digital_rain_ctx.fillRect(0, 0, odb_digital_rain_canvas.width, odb_digital_rain_canvas.height);

        odb_digital_rain_ctx.fillStyle = "#0F0"; //green
        odb_digital_rain_ctx.font = odb_digital_rain_font_size + "px arial";

        for(var i = 0; i < odb_digital_rain_drops.length; i++)
        {
            var digital = odb_digital_rain_digitals[Math.floor(Math.random()*odb_digital_rain_digitals.length)];

            odb_digital_rain_ctx.fillText(digital, i*odb_digital_rain_font_size, odb_digital_rain_drops[i]*odb_digital_rain_font_size);
            
            if(odb_digital_rain_drops[i]*odb_digital_rain_font_size > odb_digital_rain_canvas.height && Math.random() > 0.975)
              odb_digital_rain_drops[i] = 0;
            
              odb_digital_rain_drops[i]++;
        }
      }

      function Obsidian_Dynamic_Background_Start() {
        odb_digital_rain_canvas = document.querySelector("div.odb-dt-digital-rain-dynamic-effect canvas");
        odb_digital_rain_canvas.width = window.innerWidth;
        odb_digital_rain_canvas.height = window.innerHeight;

        odb_digital_rain_ctx = odb_digital_rain_canvas.getContext("2d");

        odb_digital_rain_grd = odb_digital_rain_ctx.createLinearGradient(0, window.innerHeight, 0, 0);

        odb_digital_rain_ctx.fillStyle = odb_digital_rain_grd;
        odb_digital_rain_ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        odb_digital_rain_columns = odb_digital_rain_canvas.width/odb_digital_rain_font_size;

        for(var x = 0; x < odb_digital_rain_columns; x++)
          odb_digital_rain_drops[x] = 1; 
      }

      function Obsidian_Dynamic_Background_Clear() {
        clearInterval(odb_digital_rain_interval);
        console.log("aaaaaaaaaaaaaaaaa");
      }

      Obsidian_Dynamic_Background_Start();
      odb_digital_rain_interval = setInterval(Obsidian_Dynamic_Background_Draw, 80);
    `
    effectScript = effect.createEl("script");
    effectScript.textContent = code;
  }
}

// Remove Digital Rain dynamic background effect for dark theme
export function Remove_DigitalRain(dynamicBackgroundContainer: HTMLDivElement){
  let effect = dynamicBackgroundContainer.find("div.odb-dt-digital-rain-dynamic-effect");
  if (effect) {
    CallClear(dynamicBackgroundContainer);
    effect.remove();
  }

  Unload_Effect_Script();
}

function Unload_Effect_Script()
{  
  window["Obsidian_Dynamic_Background_Start"] = null;
  window["Obsidian_Dynamic_Background_Draw"] = null;
  window["Obsidian_Dynamic_Background_Clear"] = null;
}

function CallClear(dynamicBackgroundContainer: HTMLDivElement){
  let effectScript: HTMLScriptElement;

  let effect = dynamicBackgroundContainer.find("div.odb-dt-digital-rain-dynamic-effect");

  let code = `
    Obsidian_Dynamic_Background_Clear();
    `

  effectScript = effect.createEl("script");
  effectScript.textContent = code;
}