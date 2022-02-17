class GameElement {
  constructor(type) {
    this._type = type;
    this._list = [];
  }

  newOne(y, x) {
    if (y !== undefined)
      y = this._list[this._list.length - 1].y;
    this._list.push(new this._type(x, y));
  }

  render(canvas, ctx) {
    this._list.forEach(e => e.render(canvas, ctx));
  }
}

module.exports = GameElement;