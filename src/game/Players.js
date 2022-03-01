import { SIZE } from "./options/options";
import Player from "./Player";

class Players {
  constructor(x, y) {
    x = x ? x : 0;
    y = y ? y : 0;
    this._list = [
      new Player(x, y),
      new Player(x - SIZE.width, y),
      new Player(x + SIZE.width, y)
    ];
  }

  get list() {
    return (this._list);
  }

  render(canvas, ctx) {
    this.list.forEach(e => e.render(canvas, ctx));
  }
}

export default Players;