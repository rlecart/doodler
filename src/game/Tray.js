const { SIZE, COLORS } = require("./options/options");

class Tray {
  constructor(x, lastY) {
    if (lastY === undefined)
      lastY = 0;
    if (x === undefined)
      x = 0;
    this._length = {
      x: 300,
      y: 45
    };
    this._x = x + this.generateNewRangeX();
    this._y = lastY + this.generateNewRangeY();
    this._translation = {
      y: 0,
      x: 0,
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

  get realPos() {
    return ({
      x: (SIZE.width / 2) + this._x - (this._length.x / 2) - (this._length.y / 2),
      y: SIZE.height - this._y - this._translation.y - (this._length.y / 2),
      xMax: (SIZE.width / 2) + this._x + (this._length.x / 2) + (this._length.y / 2),
      yMax: SIZE.height - this._y - this._translation.y + (this._length.y / 2),
    });
  }

  generateNewRangeY() {
    const minimum = this._length.y * 5;
    const add = Math.floor(Math.random() * this._length.y * 2) + minimum;
    return (add);
  }

  generateNewRangeX() {
    const direction = Math.floor(Math.random() * 2);
    console.log(direction);
    const add = Math.floor(Math.random() * ((SIZE.width / 2) - ((this._length.x + this._length.y) / 2)));

    if (direction === 0) {
      return (-add);
    }
    else if (direction === 1) {
      return (add);
    }
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._length.x / 2);
    const startY = canvas.height - this._y - this._translation.y - (this._length.y / 2);
    ctx.fillStyle = COLORS['trays'];
    ctx.fillRect(startX, startY, this._length.x, this._length.y);
    ctx.beginPath();
    ctx.arc(startX, startY + (this._length.y / 2), this._length.y / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(startX + this._length.x, startY + (this._length.y / 2), this._length.y / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Tray;