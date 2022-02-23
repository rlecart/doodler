const { SIZE, COLORS } = require("./options/options");

class Player {
  constructor() {
    this._length = {
      x: 110,
      y: 55,
    };
    this._x = 0;
    this._y = this._length.y / 2;
    this._translation = {
      x: 0,
      y: 0,
    };
  }

  set translation(value) {
    this._translation = { ...this._translation, ...value };
  }
  get translation() {
    return (this._translation);
  }
  get y() {
    return (this._y);
  }

  get x() {
    return (this._x);
  }

  get realPos() {
    return ({
      x: (SIZE.width / 2) + this._x - (this._length.x / 2),
      y: (SIZE.height - (this._y - this._translation.y) - (this._length.y / 2)),
      xMax: (SIZE.width / 2) + this._x + (this._length.x / 2),
      yMax: (SIZE.height - (this._y - this._translation.y) + (this._length.y / 2)),
    });
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._length.x / 2);
    const startY = canvas.height - (this._y - this._translation.y) - (this._length.y / 2);
    ctx.fillStyle = COLORS['player'];
    ctx.fillRect(startX, startY, this._length.x, this._length.y);
    ctx.beginPath();
    ctx.arc(startX + (this._length.x / 2), startY, this._length.x / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Player;