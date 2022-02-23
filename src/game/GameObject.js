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
      pos: {
        x: 0,
        y: 0,
      },
      velocity: {
        x: 0.0,
        y: -27.0,
      },
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

  stop() {
    clearInterval(this._interval);
  }

  loop() {
    this.update();
    this.render();
    // console.log('interval render', this._framesCounter);
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
    console.log('jump');
    this._physics.momentum = this._physics.pos.y + 100;
    this._physics.velocity.y = -27.0;
    this._physics.onGround = false;
    // }
  }

  startMove(key) {
    this._move = { ...this._move, [key]: true };
  }

  update() {
    this._physics.velocity.y += this._physics.gravity;
    this._physics.pos.y += this._physics.velocity.y;

    if (this._physics.velocity.y >= -10.0 && this._firstJump) {
      // console.log('couciu');
      this._toBeDisplayed['player'].list[0].translation.y = this._physics.pos.y;
      this._physics.pos.y = 0;
      this._firstJump = false;
    }
    if (this._physics.pos.y > this._physics.momentum) {
      // console.log('ground')
      this._physics.pos.y = this._physics.momentum;
      this._physics.velocity.y = 0.0;
      this._physics.onGround = true;
      this._firstJump = false;
      // console.log('c cui');
    }
    Object.entries(this._toBeDisplayed).forEach(([key, value]) => {
      // if (key !== 'player') {
      if ((this._firstJump && key === 'player') || (!this._firstJump && key !== 'player')) {
        value.list.forEach(e => {
          e.translation.y = this._physics.pos.y;
        });
      }
    });
    this._toBeDisplayed['trays'].list.forEach((e, i) => {
      // if (i === 0) {
      const player = this._toBeDisplayed['player'].list[0];
      // console.log('\n[player] realPos');
      // console.log(`x: ${player.realPos.x}, xMax: ${player.realPos.xMax}`);
      // console.log(`y: ${player.realPos.y}, yMax: ${player.realPos.yMax}`);
      // console.log(`translation.y: ${player._translation.y}`);
      // console.log('[tray] realPos');
      // console.log(`x: ${e.realPos.x}, xMax: ${e.realPos.xMax}`);
      // console.log(`y: ${e.realPos.y}, yMax: ${e.realPos.yMax}`);
      // console.log('\n');
      if (this._physics.velocity.y > 0.0
        && (e.realPos.xMax > player.realPos.x && e.realPos.x < player.realPos.xMax)
        && (e.realPos.y < player.realPos.yMax && e.realPos.yMax > player.realPos.y + player._length.y - 10)) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
        this.jump();
      }
      // }
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