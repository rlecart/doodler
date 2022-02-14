import '../style/Game.css';
import { Col } from "reactstrap";

const FPS60 = 100000 / 60;

class Tray {
  constructor(x, lastY) {
    this._x = 0;
    this._y = lastY + 20;
    this._lengthX = 30;
    this._lengthY = 5;
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._lengthX / 2);
    const startY = canvas.height - this._y - (this._lengthY / 2);
    ctx.fillStyle = 'red';
    ctx.fillRect(startX, startY, this._lengthX, this._lengthY);
  }
}

class GameElement {
  constructor(type) {
    this._type = type;
    this._list = [];
  }

  newOne(x, y) {
    this._list.push(new this._type(x, y));
  }

  render(canvas, ctx) {
    this._list.forEach(e => e.render(canvas, ctx));
  }
}

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
    this._toBeDisplayed.trays.newOne(0, 0);
  }

  start() {
    this.init();
    this.startInterval();
  }

  startInterval() {
    this._interval = setInterval(() => this.render().bind(this), FPS60);
  }

  resetInterval() {
    clearInterval(this._interval);
    this.startInterval();
  }

  render() {
    if (Object.values(this._toBeDisplayed).length !== 0) {
      console.log(this._toBeDisplayed);
      Object.values(this._toBeDisplayed).forEach(e => e.render(this._canvas, this._ctx));
    }
  }
}

const Game = ({ }) => {
  const g = new GameObject();
  setTimeout(() => g.start(), 500);

  return (
    <canvas className='game' width={'55vw'} height={'55vh'}>
    </canvas>
  );
};

export default Game;