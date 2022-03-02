import Player from "./Player";
import Pos from "./Pos";

class Spec extends Player {
  constructor({ x, y, id, color }) {
    super(x, y);
    this._id = id;
    this._color = color;
  }

  get id() {
    return (this._id);
  }
  get color() {
    return (this._color);
  }
}

export default Spec;