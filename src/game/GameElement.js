class GameElement {
  constructor(type) {
    this._type = type;
    this._list = [];
    this.newOne();
  }

  get list() {
    return (this._list);
  }

  newOne(pos) {
    let y = pos ? pos.y : undefined;
    let x = pos ? pos.x : undefined;
    if (!pos && this.list.length > 0)
      y = this.list[this.list.length - 1].pos.y;
    this.list.push(new this._type(x, y));
  }

  render(canvas, ctx) {
    this.list.forEach(e => e.render(canvas, ctx));
  }
}

module.exports = GameElement;