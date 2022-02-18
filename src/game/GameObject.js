const { FPS60 } = require("./options/options");
const GameElement = require("./GameElement");
const Tray = require("./Tray");
const Player = require("./Player");

class GameObject {
  constructor() {
    this._canvas = undefined;
    this._ctx = undefined;
    this._interval = undefined;
    this._toBeDisplayed = {};
    this._fps = 0;
    this._framesCounter = 0;
    this._physics = {
      posX: 0,
      posY: 0,
      velocityY: -27.0,
      gravity: 0.7,
      onGround: false,
      momentum: 175,
    };
    this._firstJump = true;
  }

  init() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._toBeDisplayed = {
      ...this._toBeDisplayed,
      'trays': new GameElement(Tray),
      'player': new GameElement(Player),
    };
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
  }

  start() {
    this.init();
    this.startInterval();
  }

  loop() {
    this.update();
    this.render();
    console.log('interval render', this._framesCounter);
  }

  startInterval() {
    this._interval = setInterval(() => this.loop(), FPS60);
  }

  resetInterval() {
    clearInterval(this._interval);
    this.startInterval();
  }

  jump() {
    // if (this._physics.onGround) {
    this._physics.velocityY = -27.0;
    this._physics.onGround = false;
    // }
  }

  update() {
    this._physics.velocityY += this._physics.gravity;
    this._physics.posY += this._physics.velocityY;

    if (this._physics.posY > this._physics.momentum) {
      this._physics.posY = this._physics.momentum;
      this._physics.velocityY = 0.0;
      this._physics.onGround = true;
      this._firstJump = false;
      console.log('c cui');
    }
    Object.entries(this._toBeDisplayed).forEach(([key, value]) => {
      // if (key !== 'player') {
        if ((this._firstJump && key === 'player') || (!this._firstJump && key !== 'player')) {
        value.list.forEach(e => {
          e.translationY = this._physics.posY;
        });
      }
    });
  }

  render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    if (Object.values(this._toBeDisplayed).length !== 0) {
      // this._toBeDisplayed['trays'].list.forEach(e => e.y--);
      Object.values(this._toBeDisplayed).forEach(e => e.render(this._canvas, this._ctx));
    }
    this._framesCounter++;
  }
}

module.exports = GameObject;