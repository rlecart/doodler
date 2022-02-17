const { SIZE, COLORS } = require("./options/options");

class Player {
  constructor() {
    this._lengthX = 110;
    this._lengthY = 110;
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
    ctx.fillStyle = COLORS['player'];
    ctx.fillRect(startX, startY, this._lengthX, this._lengthY);
    ctx.beginPath();
    ctx.arc(startX + (this._lengthX / 2), startY, this._lengthX / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Player;