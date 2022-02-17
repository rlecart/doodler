const { FPS60 } = require("./options/options");
const GameElement = require("./GameElement");
const Tray = require("./Tray");

class GameObject {
  constructor() {
    this._canvas = undefined;
    this._ctx = undefined;
    this._interval = undefined;
    this._toBeDisplayed = {};
    this._fps = 0;
    this._framesCounter = 0;
  }

  init() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._toBeDisplayed = {
      ...this._toBeDisplayed,
      'trays': new GameElement(Tray)
    };
  }

  start() {
    this.init();
    this.startInterval();
  }

  startInterval() {
    this._interval = setInterval(() => {
      this.render();
      this._toBeDisplayed['trays'].newOne();
      console.log('interval render', this._framesCounter);
    }, FPS60);
  }

  resetInterval() {
    clearInterval(this._interval);
    this.startInterval();
  }

  render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    if (Object.values(this._toBeDisplayed).length !== 0) {
      console.log(this._framesCounter);
      Object.values(this._toBeDisplayed).forEach(e => e.render(this._canvas, this._ctx));
    }
    this._framesCounter++;
  }
}

module.exports = GameObject;