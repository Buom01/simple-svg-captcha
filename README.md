# Simple (and secure) SVG captcha

## Usage
```JavaScript
const SimpleSvgCaptcha = require('simple-svg-captcha');

const simpleSvgCaptcha = new SimpleSvgCaptcha({
  // Options goes here
});

simpleSvgCaptcha.generate().then(({image, token})=>{
  // Token is the text that is written on the image to verify that the user is an human
  // Image is a SVG string image which is intented to be unreadable by machine
})

```

## Why
### Why an other SVG captcha package ?
Because [svg-captcha](https://www.npmjs.com/package/svg-captcha) has a big problem of security (at least accorting to me):
Path of text has fill property and noise has stroke property which make text easily discernable.
When you remove noise, even if text is transformed to path, the font is know and then you just need to each image caracter whith know caracter for a match.

Simple SVG captcha solve this mainly by trying to make no difference between text and noise, suffle them in order, and finally deform randomly all paths.

### Why SVG ?
SVG is a really light format of image, which is really good for mobile network. Moreover dealing with image in JavaScript is not so easy. While SVG is kind of text, it's a lot more easy to generate it on the server.
It got on a Intel duo less than 20ms to generate an image/token pair.

### Why not external service ?
Independance + privacy granted while keeping speed.

## Possible enchancement
- Make noise more complicated for a computer to discernable (mainly due to noise size)
- Enchance accessibility (does other captcha plugin take care of it ?)

## Demos

(Answer is the image filename)

- ![Captcha JZDTVG](JZDTVG.svg)
- ![Captcha OHG1UL](OHG1UL.svg)
- ![Captcha ACAKH1](ACAKH1.svg)