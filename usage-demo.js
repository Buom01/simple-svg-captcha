const SimpleSvgCaptcha = require('./index.js');

const simpleSvgCaptcha = new SimpleSvgCaptcha({
  // Options goes here
});

simpleSvgCaptcha.generate().then(({image,token})=>{
  console.log(token, image);
})
