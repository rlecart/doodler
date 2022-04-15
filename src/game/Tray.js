import { SIZE, COLORS } from "./options/options";
import cam from './Camera';
import Physics from './Physics';
import WhoHavePhysics from "./WhoHavePhysics";

class Tray extends WhoHavePhysics {
  constructor(x, lastY) {
    super();
    this._physics = new Physics({
      length: {
        x: SIZE.tray.x,
        y: SIZE.tray.y,
      },
      pos: {
        x: x,
        y: lastY,
      },
      gravity: {
        x: 0.65,
        y: 0.7
      }
    });
    this.pos.x += this.generateNewRangeX();
    this.pos.y += this.generateNewRangeY();
  }

  get realPos() {
    return ({
      x: (SIZE.width / 2) + this.pos.x - (this.length.x / 2) - (this.length.y / 2) + cam.pos.x,
      y: SIZE.height - this.pos.y - this.translation.y - cam.pos.y - (this.length.y / 2),
      xMax: (SIZE.width / 2) + this.pos.x + (this.length.x / 2) + (this.length.y / 2) + cam.pos.x,
      yMax: SIZE.height - this.pos.y - this.translation.y - cam.pos.y + (this.length.y / 2),
    });
  }

  generateNewRangeY() {
    const minimum = this.length.y * 5;
    const add = Math.floor(Math.random() * this.length.y * 2) + minimum;
    return (add);
  }

  generateNewRangeX() {
    const direction = Math.floor(Math.random() * 2);
    console.log(direction);
    const add = Math.floor(Math.random() * ((SIZE.width / 2) - ((this.length.x + this.length.y) / 2)));

    if (direction === 0) {
      return (-add);
    }
    else if (direction === 1) {
      return (add);
    }
  }

  render(canvas, ctx) {
    const realPos = this.realPos;
    const startX = realPos.x;
    const startY = realPos.y;
    ctx.fillStyle = COLORS['trays'];
    ctx.fillRect(startX + (this.length.y / 2), startY, this.length.x, this.length.y);
    ctx.beginPath();
    ctx.arc(startX + (this.length.y / 2), startY + (this.length.y / 2), this.length.y / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(realPos.xMax - (this.length.y / 2), startY + (this.length.y / 2), this.length.y / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

export default Tray;