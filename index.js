const TextToSVG = require('text-to-svg');
const parse = require('parse-svg-path');

const {
  getRandomInt,
  getRandomFloat,
  shuffleArray,
  randColor
} = require('./utils.js');

const defaultOptions = {
  charList: "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345679", // alpha + number - too similar characters
  min: 5,
  max: 7,
  colorCharList: "0123456789ABC",
  //font: undefined
}

const textOptions = {x: 0, y: 0, fontSize: 72, anchor: 'top'};

function generateNoise(width, height) {
  var lastX = getRandomFloat(0, width);  // We want to generate a value depedant of last value, just for random
  var lastY = getRandomFloat(0, height);  // It's kinda useless cause it's using relative coords
  var path = `M${lastX} ${lastY}`;
  for (var i = getRandomInt(4,16); i>0; i--) {
    lastX = lastX+getRandomFloat(-5, 5);
    lastY = lastY+getRandomFloat(-5, 5);
    path += `L${lastX} ${lastY}`;
  }
  path += "Z";

  return path;
}
function generateNoises(width, height) {
  return Array(getRandomInt(0,3)).fill().map(()=>generateNoise(width, height)).join('');
}


module.exports = class SimpleSvgCaptcha{
  constructor (options){
    this.options = {...defaultOptions, ...options};
    this.textToSVG = TextToSVG.loadSync(this.options.font);
  }
  generate (){
    const {min, max, charList, colorCharList} = this.options;
    const {textToSVG} = this;
    return new Promise(function(resolve, reject) {
      try {
        var nChar = getRandomInt(min, max);
        const token = Array(nChar).fill().map(()=>{
          return charList[getRandomInt(0, charList.length - 1)];
        }).join('');


        const {width, height} = textToSVG.getMetrics(token, textOptions);
        const CaptchaPath = textToSVG.getD(token, textOptions).split("Z").map((StringLetterPath)=>{
          return generateNoises(width, height)+StringLetterPath+'Z'+generateNoises(width, height);
        }).join('');  // Simple noise and text

        const path = parse(CaptchaPath).map((command)=>{  // Appliy deformation
          return command.map((arg)=>{
            if(typeof arg == "string") return arg;
            return Math.round(arg + getRandomFloat(-4, 4));
          })
        })
        const pathStrings = shuffleArray(path.map((command)=>{  // Convert to string, and shuffle path, and split each gometry
          if(command.length == 1) return command;
          if(command.length == 3) return `${command[0]}${command[1]} ${command[2]}`
          if(command.length == 5) return `${command[0]}${command[1]} ${command[2]} ${command[3]} ${command[4]}`
          throw new Error ("Unsopported command", command);
        }).join('').split('Z').map((path)=>(path+'Z')));

        const image = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0,0,${width},${height}">${pathStrings.map(path=>(`<path fill="${randColor(colorCharList)}" d="${path}"/>`)).join('')}</svg>`;  // Convert to SVG image with unique color to each geometry

        resolve({
          image,
          token
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
