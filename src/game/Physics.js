import Pos from './Pos';

class Physics {
  constructor({ pos, length, translation, gravity, velocity }) {
    this._pos = new Pos(pos);
    this._length = new Pos(length);
    this._translation = new Pos(translation);
    this._velocity = new Pos(velocity);
    this._gravity = new Pos(gravity);
  }

  get pos() {
    return (this._pos);
  }
  get length() {
    return (this._length);
  }
  get translation() {
    return (this._translation);
  }
  get velocity() {
    return (this._velocity);
  }
  get gravity() {
    return (this._gravity);
  }
}

export default Physics;