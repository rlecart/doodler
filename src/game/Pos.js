class Pos {
  constructor(pos) {
    this._x = pos && pos.x ? pos.x : 0.0;
    this._y = pos && pos.y ? pos.y : 0.0;
  }

  get x() {
    return (this._x);
  }
  get y() {
    return (this._y);
  }
  get formatted() {
    return ({
      x: this.x,
      y: this.y,
    });
  }

  set x(value) {
    this._x = value;
  }
  set y(value) {
    this._y = value;
  }
}

export default Pos;