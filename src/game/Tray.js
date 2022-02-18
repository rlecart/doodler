const { SIZE, COLORS } = require("./options/options");

class Tray {
  constructor(x, lastY) {
    if (lastY === undefined)
      lastY = 0;
    if (x === undefined)
      x = 0;
    this._lengthX = 300;
    this._lengthY = 45;
    this._x = x + this.generateNewRangeX();
    this._y = lastY + this.generateNewRangeY();
    this._translationY = 0;
  }

  set translationY(value) {
    this._translationY = value;
  }

  get y() {
    return (this._y);
  }

  generateNewRangeY() {
    const minimum = this._lengthY * 5;
    const add = Math.floor(Math.random() * this._lengthY * 2) + minimum;
    return (add);
  }

  generateNewRangeX() {
    const direction = Math.floor(Math.random() * 2);
    console.log(direction);
    const add = Math.floor(Math.random() * ((SIZE.width / 2) - ((this._lengthX + this._lengthY) / 2)));

    if (direction === 0) {
      return (-add);
    }
    else if (direction === 1) {
      return (add);
    }
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._lengthX / 2);
    const startY = canvas.height - this._y - this._translationY - (this._lengthY / 2);
    ctx.fillStyle = COLORS['trays'];
    ctx.fillRect(startX, startY, this._lengthX, this._lengthY);
    ctx.beginPath();
    ctx.arc(startX, startY + (this._lengthY / 2), this._lengthY / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(startX + this._lengthX, startY + (this._lengthY / 2), this._lengthY / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Tray;