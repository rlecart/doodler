import { SIZE, COLORS } from "./options/options";
import Physics from "./Physics";
import cam from "./Camera";
import WhoHavePhysics from "./WhoHavePhysics";
import Pos from "./Pos";

class Player extends WhoHavePhysics {
  constructor(x, y) {
    super();
    this._physics = new Physics({
      pos: {
        x: x,
        y: y,
      },
      length: {
        x: 110,
        y: 55,
      },
      gravity: {
        x: 0.65,
        y: 0.7,
      },
      velocity: {
        x: 0.0,
        y: -27.0,
      },
    });
  }

  get left() {
    const realPos = this.realPos;

    return ({
      x: this.x - SIZE.width,
      y: this.y,
      realPos: {
        x: realPos.x - SIZE.width,
        y: realPos.y,
        xMax: realPos.xMax - SIZE.width,
        yMax: realPos.yMax,
      }
    });
  }

  get right() {
    const realPos = this.realPos;

    return ({
      x: this.x + SIZE.width,
      y: this.y,
      realPos: {
        x: realPos.x + SIZE.width,
        y: realPos.y,
        xMax: realPos.xMax + SIZE.width,
        yMax: realPos.yMax,
      }
    });
  }

  get realPos() {
    return ({
      x: (SIZE.width / 2) + (this.pos.x + this.translation.x - cam.pos.x) - (this.length.x / 2),
      y: (SIZE.height - (this.pos.y - this.translation.y + cam.pos.y) - (this.length.y / 2)),
      xMax: (SIZE.width / 2) + (this.pos.x + this.translation.x - cam.pos.x) + (this.length.x / 2),
      yMax: (SIZE.height - (this.pos.y - this.translation.y + cam.pos.y) + (this.length.y / 2)),
    });
  }

  render(canvas, ctx) {
    const realPos = this.realPos;
    const startX = realPos.x;
    const startY = realPos.y;
    const left = this.left;
    const right = this.right;
    ctx.fillStyle = COLORS['player'];

    ctx.fillRect(startX, startY, this.length.x, this.length.y);
    ctx.beginPath();
    ctx.arc(startX + (this.length.x / 2), startY, this.length.x / 2, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.fillRect(left.realPos.x, left.realPos.y, this.length.x, this.length.y);
    ctx.beginPath();
    ctx.arc(left.realPos.x + (this.length.x / 2), left.realPos.y, this.length.x / 2, 0, 2 * Math.PI, false);
    ctx.fill();

    ctx.fillRect(right.realPos.x, right.realPos.y, this.length.x, this.length.y);
    ctx.beginPath();
    ctx.arc(right.realPos.x + (this.length.x / 2), right.realPos.y, this.length.x / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

export default Player;