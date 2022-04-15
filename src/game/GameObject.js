import { COLORS, FPS60, SIZE } from "./options/options";
import GameElement from "./GameElement";
import Tray from "./Tray";
import Player from "./Player";
import cam from './Camera';
import Players from "./Players";
import Spec from "./Spec";
import { generateId, objLen } from "../utils/utils";
import Bot from "./Bot";

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
  }

  get player() {
    return (this._toBeDisplayed['players'].list[0]);
  }
  get specs() {
    return (this._toBeDisplayed['specs']);
  }
  get bots() {
    return (this._toBeDisplayed['bots']);
  }
  get socket() {
    return (this._socket);
  }

  set socket(value) {
    this._socket = value;
  }

  printThis() {
    console.log(this);
  }

  init() {
    this._canvas = document.querySelector('canvas');
    this._ctx = this._canvas.getContext('2d');
    this._toBeDisplayed = {
      ...this._toBeDisplayed,
      'trays': new GameElement(Tray),
      'bots': new GameElement(Bot),
      'specs': new GameElement(Spec),
      'players': new GameElement(Player),
      // 'spec': new GameElement(Players),
    };
    this._toBeDisplayed['players'].newOne();
    for (let i = 0; i < 50; i++)
      this._toBeDisplayed['trays'].newOne();
    // console.log(this._toBeDisplayed['bots']);
    // for (let i = 0; i < 10; i++)
    //   this._toBeDisplayed['bots'].newOne({ x: 0.0, y: 0.0 });
    this.createSomeBots(400);
    // console.log(this._toBeDisplayed['bots']);
    this.player.jump();
    for (let bot of Object.values(this.bots.listObj)) {
      bot.jump();
    }
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
      // console.log('ca refresh');
      this.socket.emit('refreshMyPos', 'niquetamere', {
        pos: this.player.pos.formatted,
        id: this.socket.id,
        color: COLORS['players'],
      }, (specs) => this.refreshSpecs(specs));
    }
  }

  createSomeBots(nb) {
    for (let i = 0; i < nb; i++) {
      let id;
      do {
        id = generateId();
      } while (this.bots[id]);
      this.bots.listObj = { ...this.bots.listObj, [id]: new Bot(id) };
    }
  }

  refreshSpecs(specs) {
    specs.forEach((e, i) => {
      if (e.id !== this.socket.id && objLen(this.specs.listObj) > 0 && this.specs.listObj[e.id]) {
        const spec = this.specs.listObj[e.id];
        spec.pos.x = e.pos.x;
        spec.pos.y = e.pos.y;
        // spec.color = e.color;
      }
      else if (e.id !== this.socket.id) {
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

  // jump() {
  //   // if (this.player.onGround) {
  //   console.log('jump');
  //   // this.player.momentum = this.player.pos.y + 100;
  //   this.player.velocity.y = -27.0;
  //   // this.player.onGround = false;
  //   // }
  // }

  moveCamera(dir) {
    // console.log('move camera ', dir);
    if (dir === 'ArrowUp')
      cam.pos.y += 100;
    else if (dir === 'ArrowDown')
      cam.pos.y -= 100;
  }

  update() {
    // update player etc
    this.player.update();
    for (let bot of Object.values(this._toBeDisplayed['bots'].listObj)) {
      bot.update();
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
      this.player.doesItCollide(e);
      for (let bot of Object.values(this._toBeDisplayed['bots'].listObj)) {
        bot.updateNearestTray(e.pos);
        bot.doesItCollide(e);
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