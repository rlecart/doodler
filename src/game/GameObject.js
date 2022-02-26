const { FPS60, SIZE } = require("./options/options");
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
      gravity: {
        x: 0.65,
        y: 0.7,
      },
      onGround: false,
      momentum: 175,
    };
    this._firstJump = true;
    this._move = {
      keyPressed: {},
      dir: '',
    };
  }

  init() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._toBeDisplayed = {
      ...this._toBeDisplayed,
      'trays': new GameElement(Tray),
      'player': new GameElement(Player),
    };
    this._toBeDisplayed['player'].newOne(0, -SIZE.width);
    this._toBeDisplayed['player'].newOne(0, SIZE.width);
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
    this._toBeDisplayed['trays'].newOne();
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
    this._move.keyPressed = { ...this._move.keyPressed, [key]: true };
    this.changeDir();
  }

  stopMove(key) {
    this._move.keyPressed = { ...this._move.keyPressed, [key]: false };
    this.changeDir();
  }

  changeDir() {
    if (this._move.keyPressed['ArrowLeft'] && this._move.keyPressed['ArrowRight'])
      this._move.dir = '';
    else if (this._move.keyPressed['ArrowLeft']) {
      this._move.dir = 'left';
      if (this._physics.velocity.x < 2.0 && this._physics.velocity.x > -2.0)
        this._physics.velocity.x = -2.0;
    }
    else if (this._move.keyPressed['ArrowRight']) {
      this._move.dir = 'right';
      if (this._physics.velocity.x <= 2.0 && this._physics.velocity.x > -2.0)
        this._physics.velocity.x = 2.0;
    }
    else
      this._move.dir = '';
  }

  update() {
    this._physics.velocity.y += this._physics.gravity.y;
    this._physics.pos.y += this._physics.velocity.y;

    if (this._move.dir === 'left') {
      // console.log('left', this._physics);
      if (this._physics.velocity.x > -20.0)
        this._physics.velocity.x -= this._physics.gravity.x;
      this._physics.pos.x += this._physics.velocity.x;
    }
    else if (this._move.dir === 'right') {
      // console.log('right', this._physics);
      if (this._physics.velocity.x < 20.0)
        this._physics.velocity.x += this._physics.gravity.x;
      this._physics.pos.x += this._physics.velocity.x;
    }
    else if (this._move.dir === '') {
      if (this._physics.velocity.x < 0) {
        this._physics.velocity.x += this._physics.gravity.x / 2.5;
        if (this._physics.velocity.x >= 0)
          this._physics.velocity.x = 0.0;
      }
      if (this._physics.velocity.x > 0) {
        this._physics.velocity.x -= this._physics.gravity.x / 2.5;
        if (this._physics.velocity.x <= 0)
          this._physics.velocity.x = 0.0;
      }
      this._physics.pos.x += this._physics.velocity.x;
    }
    if (this._physics.pos.x > SIZE.width / 2)
      this._physics.pos.x = -SIZE.width / 2;
    else if (this._physics.pos.x < -SIZE.width / 2)
      this._physics.pos.x = SIZE.width / 2;

    if (this._physics.velocity.y >= -10.0 && this._firstJump) {
      // console.log('couciu');
      this._toBeDisplayed['player'].list.forEach(e => e.translation.y = this._physics.pos.y);
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
      if (key === 'player')
        value.list.forEach(e => e.translation.x = this._physics.pos.x);
    });
    this._toBeDisplayed['trays'].list.forEach((e, i) => {
      // if (i === 0) {
      this._toBeDisplayed['player'].list.forEach(player => {
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
          return;
        }
      });
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