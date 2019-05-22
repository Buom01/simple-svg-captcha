function getRandomInt(min, max) {  // based on https://gist.github.com/kerimdzhanov/7529623
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomFloat(min, max) {  // based on https://gist.github.com/kerimdzhanov/7529623
  return Math.random() * (max - min) + min;
}
function shuffleArray(array) {  // based on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomInt(0, i);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function randColor(colorCharList){  // Very simple random color
  return '#'+Array(6).fill().map(()=>{
    return colorCharList[getRandomInt(0, colorCharList.length - 1)];
  }).join('');
}

module.exports = {
  getRandomInt,
  getRandomFloat,
  shuffleArray,
  randColor
}
