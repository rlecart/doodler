import { COLORS, FPS60, SIZE } from "./options/options";
import GameElement from "./GameElement";
import Tray from "./Tray";
import Player from "./Player";
import cam from './Camera';
import Players from "./Players";
import Spec from "./Spec";
import { objLen } from "../utils/utils";

class GameObject {
  constructor() {
    this._socket = undefined;
    this._canvas = undefined;
    this._ctx = undefined;
    this._interval = undefined;
    this._toBeDisplayed = {};
    this._fps = 0;
    this._framesCounter = 0;
    this._firstJump = true;
    this._move = {
      keyPressed: {},
      dir: '',
    };
  }

  get player() {
    return (this._toBeDisplayed['players'].list[0]);
  }
  get specs() {
    return (this._toBeDisplayed['specs']);
  }
  get socket() {
    return (this._socket);
  }

  set socket(value) {
    this._socket = value;
  }

  init() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._toBeDisplayed = {
      ...this._toBeDisplayed,
      'trays': new GameElement(Tray),
      'players': new GameElement(Player),
      'specs': new GameElement(Spec),
      // 'spec': new GameElement(Players),
    };
    this._toBeDisplayed['players'].newOne();
    this._toBeDisplayed['players'].newOne();
    for (let i = 0; i < 50; i++)
      this._toBeDisplayed['trays'].newOne();
    this.jump();
    this.loop();
  }

  stop() {
    clearInterval(this._interval);
  }

  loop() {
    this.update();
    this.sendMyPos();
    this.render();
    // console.log('interval render', this._framesCounter);
  }

  sendMyPos() {
    if (this.socket && this.socket.connected) {
      console.log('ca refresh');
      this.socket.emit('refreshMyPos', 'niquetamere', {
        pos: this.player.pos.formatted,
        id: this.socket.id,
        color: COLORS['players'],
      }, (specs) => this.refreshSpecs(specs));
    }
  }

  refreshSpecs(specs) {
    console.log('ah bah la ca cb', specs);
    console.log('list', this.specs);
    console.log('list2', this.specs.listObj);
    specs.forEach((e, i) => {
      console.log('aaaaaaaaaaaaaa ', e);
      console.log('qwf', objLen(this.specs.listObj));
      console.log('qqqfwq', this.specs.listObj[e.id]);
      if (objLen(this.specs.listObj) > 0 && this.specs.listObj[e.id]) {
        const spec = this.specs.listObj[e.id];
        spec.pos.x = e.pos.x;
        spec.pos.y = e.pos.y;
        // spec.color = e.color;
      }
      else {
        this.specs.listObj = { ...this.specs.listObj, [e.id]: new Spec(e) };
      }
    });
  }

  start() {
    this._interval = setInterval(() => this.loop(), FPS60);
  }

  reset() {
    clearInterval(this._interval);
    this.start();
  }

  jump() {
    // if (this.player.onGround) {
    console.log('jump');
    // this.player.momentum = this.player.pos.y + 100;
    this.player.velocity.y = -27.0;
    // this.player.onGround = false;
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
      if (this.player.velocity.x < 2.0 && this.player.velocity.x > -2.0)
        this.player.velocity.x = -2.0;
    }
    else if (this._move.keyPressed['ArrowRight']) {
      this._move.dir = 'right';
      if (this.player.velocity.x <= 2.0 && this.player.velocity.x > -2.0)
        this.player.velocity.x = 2.0;
    }
    else
      this._move.dir = '';
  }

  moveCamera(dir) {
    console.log('move camera ', dir);
    if (dir === 'ArrowUp')
      cam.pos.y += 100;
    else if (dir === 'ArrowDown')
      cam.pos.y -= 100;
  }

  update() {
    console.log(this.player);
    this.player.velocity.y += this.player.gravity.y;
    this.player.pos.y -= this.player.velocity.y;
    if (!this._firstJump)
      cam.pos.y += this.player.velocity.y;

    if (this._move.dir === 'left') {
      // console.log('left', cam);
      if (this.player.velocity.x > -20.0)
        this.player.velocity.x -= this.player.gravity.x;
      this.player.pos.x += this.player.velocity.x;
    }
    else if (this._move.dir === 'right') {
      // console.log('right', cam);
      if (this.player.velocity.x < 20.0)
        this.player.velocity.x += this.player.gravity.x;
      this.player.pos.x += this.player.velocity.x;
    }
    else if (this._move.dir === '') {
      if (this.player.velocity.x < 0) {
        this.player.velocity.x += this.player.gravity.x / 2.5;
        if (this.player.velocity.x >= 0)
          this.player.velocity.x = 0.0;
      }
      if (this.player.velocity.x > 0) {
        this.player.velocity.x -= this.player.gravity.x / 2.5;
        if (this.player.velocity.x <= 0)
          this.player.velocity.x = 0.0;
      }
      this.player.pos.x += this.player.velocity.x;
    }
    if (this.player.pos.x > SIZE.width / 2)
      this.player.pos.x = -SIZE.width / 2;
    else if (this.player.pos.x < -SIZE.width / 2)
      this.player.pos.x = SIZE.width / 2;

    if (this._firstJump && this.player.velocity.y >= -10.0) {
      // console.log('couciu');
      // this.player.translation.y = this.player.pos.y;
      // this.player.pos.y = 0.0;
      this._firstJump = false;
    }
    if (this.player.pos.y <= 0) {
      console.log('ground');
      this.player.pos.y = 0.0;
      this.player.velocity.y = 0.0;
      this.player.onGround = true;
      this._firstJump = true;
      console.log('c cui');
    }



    // Object.entries(this._toBeDisplayed).forEach(([key, value]) => {
    //   // if (key !== 'players') {
    //   // if ((this._firstJump && key === 'players') || (!this._firstJump && key !== 'players')) {
    //   //   value.list.forEach(e => {
    //   //     e.translation.y = this.player.pos.y;
    //   //   });
    //   // }
    //   if (key === 'players')
    //     value.list.forEach(e => e.translation.x = this.player.pos.x);
    // });
    // this._toBeDisplayed['players'].list.forEach((e, i) => {
    //   if (i > 0) {
    //     e.translation.x = this.player.pos.x;
    //     e.translation.y = -this.player.pos.y + this.player.translation.y;
    //   }
    // });
    this._toBeDisplayed['trays'].list.forEach((e, i) => {
      // if (i === 0) {
      // console.log('\n[player] realPos');
      // console.log(`x: ${player.realPos.x}, xMax: ${player.realPos.xMax}`);
      // console.log(`y: ${player.realPos.y}, yMax: ${player.realPos.yMax}`);
      // console.log(`translation.y: ${player._translation.y}`);
      // console.log('[tray] realPos');
      // console.log(`x: ${e.realPos.x}, xMax: ${e.realPos.xMax}`);
      // console.log(`y: ${e.realPos.y}, yMax: ${e.realPos.yMax}`);
      // console.log('\n');
      if (this.player.velocity.y > 0.0

        && ((e.realPos.xMax > this.player.realPos.x && e.realPos.x < this.player.realPos.xMax)
          || (e.realPos.xMax > this.player.left.realPos.x && e.realPos.x < this.player.left.realPos.xMax)
          || (e.realPos.xMax > this.player.right.realPos.x && e.realPos.x < this.player.right.realPos.xMax))

        && (e.realPos.y < this.player.realPos.yMax && e.realPos.yMax > this.player.realPos.y + this.player.length.y - 10)) {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaa', this._toBeDisplayed['players']);
        this.jump();
      }
    });
    // }
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

export default GameObject;