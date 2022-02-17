const { SIZE } = require("./options/options");

class Player {
  constructor() {
    this._lengthX = 300;
    this._lengthY = 45;
    this._x = 0;
    this._y = 0;
  }

  get y() {
    return (this._y);
  }

  get x() {
    return (this._x);
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._lengthX / 2);
    const startY = canvas.height - this._y - (this._lengthY / 2);
    ctx.fillStyle = '#43A765';
    ctx.fillRect(startX, startY, this._lengthX, this._lengthY);
    ctx.beginPath();
    ctx.arc(startX, startY + (this._lengthY / 2), this._lengthY / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(startX + this._lengthX, startY + (this._lengthY / 2), this._lengthY / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Player;