const { SIZE, COLORS } = require("./options/options");

class Player {
  constructor() {
    this._lengthX = 110;
    this._lengthY = 55;
    this._x = 0;
    this._y = this._lengthY / 2;
    this._translationY = 0;
  }

  set translationY(value) {
    this._translationY = value;
  }

  get y() {
    return (this._y);
  }

  get x() {
    return (this._x);
  }

  get realPos() {
    return ({
      x: (SIZE.width / 2) + this._x - (this._lengthX / 2),
      y: (SIZE.height - (this._y - this._translationY) - (this._lengthY / 2)),
      xMax: (SIZE.width / 2) + this._x + (this._lengthX / 2),
      yMax: (SIZE.height - (this._y - this._translationY) + (this._lengthY / 2)),
    });
  }

  render(canvas, ctx) {
    const startX = (canvas.width / 2) + this._x - (this._lengthX / 2);
    const startY = canvas.height - (this._y - this._translationY) - (this._lengthY / 2);
    ctx.fillStyle = COLORS['player'];
    ctx.fillRect(startX, startY, this._lengthX, this._lengthY);
    ctx.beginPath();
    ctx.arc(startX + (this._lengthX / 2), startY, this._lengthX / 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

module.exports = Player;