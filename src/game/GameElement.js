import { objLen } from '../utils/utils';

class GameElement {
  constructor(type) {
    this._type = type;
    this._list = [];
    this._listObj = {};
  }

  get list() {
    return (this._list);
  }
  get listObj() {
    return (this._listObj);
  }

  set listObj(value) {
    this._listObj = { ...this.listObj, ...value };
  }

  newOne(pos) {
    let y = pos ? pos.y : undefined;
    let x = pos ? pos.x : undefined;
    if (!pos && this.list.length > 0)
      y = this.list[this.list.length - 1].pos.y;
    this.list.push(new this._type(x, y));
  }

  render(canvas, ctx) {
    if (this.list.length > 0)
      this.list.forEach(e => e.render(canvas, ctx));
    else if (objLen(this.listObj))
      Object.values(this.listObj).forEach(e => e.render(canvas, ctx));
  }
}

export default GameElement;