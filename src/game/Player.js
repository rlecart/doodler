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
    });
    this._move = {
      keyPressed: {},
      dir: '',
    };
    this._firstJump = true;
  }

  get move() {
    return (this._move);
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

  get color() {
    return (COLORS['player']);
  }

  startMove(key) {
    this.move.keyPressed = { ...this.move.keyPressed, [key]: true };
    this.changeDir();
  }

  stopMove(key) {
    this.move.keyPressed = { ...this.move.keyPressed, [key]: false };
    this.changeDir();
  }

  changeDir() {
    if (this.move.keyPressed['ArrowLeft'] && this.move.keyPressed['ArrowRight'])
      this.move.dir = '';
    else if (this.move.keyPressed['ArrowLeft']) {
      this.move.dir = 'left';
      if (this.velocity.x < 2.0 && this.velocity.x > -2.0)
        this.velocity.x = -2.0;
    }
    else if (this.move.keyPressed['ArrowRight']) {
      this.move.dir = 'right';
      if (this.velocity.x <= 2.0 && this.velocity.x > -2.0)
        this.velocity.x = 2.0;
    }
    else
      this.move.dir = '';
  }

  doCamFollowPlayer() {
    if (!this._firstJump)
      cam.pos.y += this.velocity.y;
  }

  update() {
    this.velocity.y += this.gravity.y;
    this.pos.y -= this.velocity.y;
    this.doCamFollowPlayer();

    if (this._move.dir === 'left') {
      // console.log('left', cam);
      if (this.velocity.x > -20.0)
        this.velocity.x -= this.gravity.x;
      this.pos.x += this.velocity.x;
    }
    else if (this._move.dir === 'right') {
      // console.log('right', cam);
      if (this.velocity.x < 20.0)
        this.velocity.x += this.gravity.x;
      this.pos.x += this.velocity.x;
    }
    else if (this._move.dir === '') {
      if (this.velocity.x < 0) {
        this.velocity.x += this.gravity.x / 2.5;
        if (this.velocity.x >= 0)
          this.velocity.x = 0.0;
      }
      if (this.velocity.x > 0) {
        this.velocity.x -= this.gravity.x / 2.5;
        if (this.velocity.x <= 0)
          this.velocity.x = 0.0;
      }
      this.pos.x += this.velocity.x;
    }
    if (this.pos.x > SIZE.width / 2)
      this.pos.x = -SIZE.width / 2;
    else if (this.pos.x < -SIZE.width / 2)
      this.pos.x = SIZE.width / 2;

    if (this._firstJump && this.velocity.y >= -10.0) {
      // console.log('couciu');
      // this.translation.y = this.pos.y;
      // this.pos.y = 0.0;
      this._firstJump = false;
    }
    if (this.pos.y <= 0) {
      // console.log('ground');
      this.jump()
      // this.pos.y = 0.0;
      // this.velocity.y = 0.0;
      // this.onGround = true;
      // this._firstJump = true;
      // console.log('c cui');
    }
  }

  jump() {
    this.velocity.y = -27.0;
    // console.log(this);
  }

  doesItCollide(e) {
    if (this.velocity.y > 0.0
      && ((e.realPos.xMax > this.realPos.x && e.realPos.x < this.realPos.xMax)
        || (e.realPos.xMax > this.left.realPos.x && e.realPos.x < this.left.realPos.xMax)
        || (e.realPos.xMax > this.right.realPos.x && e.realPos.x < this.right.realPos.xMax))
      && (e.realPos.y < this.realPos.yMax && e.realPos.yMax > this.realPos.y + this.length.y - 10)) {
      this.jump();
    }
  }

  render(canvas, ctx) {
    const realPos = this.realPos;
    const startX = realPos.x;
    const startY = realPos.y;
    const left = this.left;
    const right = this.right;
    ctx.fillStyle = this.color;

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