import { SIZE, COLORS } from '../game/options/options.js';

import Spec from './Spec';
import { createVariance, generateId } from '../utils/utils';
import Pos from './Pos.js';

class Bot extends Spec {
  constructor(id) {
    super({
      x: createVariance(SIZE.width * 2) - SIZE.width,
      y: 20.0,
      id: id,
      color: COLORS['bots']
    });
    this._nearestTray = new Pos({ x: 0.0, y: 0.0 });
  }

  get nearestTray() {
    return (this._nearestTray);
  }

  set nearestTray(newTray) {
    this._nearestTray = newTray;
  }

  doCamFollowPlayer() { // override player method
  }

  updateNearestTray(newTray) { // changer par le gestion savoir si il monte ou il descend
    if (Math.abs(Math.abs(this.nearestTray.y) - Math.abs(this.pos.y) + 20) >= Math.abs(Math.abs(newTray.y) - Math.abs(this.pos.y) + 20)
      && this.velocity.y < -15
      || (this.nearestTray.x === 0 && this.nearestTray.y === 0))
      this.nearestTray = newTray;
    if (this.nearestTray.x - this.pos.x < 0 - 0 && this.velocity.x < 10) { // must go left
      if (this.move !== 'left') {
        this.stopMove('ArrowRight');
      }
      this.startMove('ArrowLeft');
    }
    else if (this.nearestTray.x - this.pos.x > 0 + 0 && this.velocity.x < 10) { // must go right
      if (this.move !== 'right') {
        this.stopMove('ArrowLeft');
      }
      this.startMove('ArrowRight');
    }
    else {
      // console.log(this.nearestTray, this.pos.x, this.pos.y);
      this.stopMove('ArrowLeft');
      this.stopMove('ArrowRight');
    }
    // this.changeDir();
  }
}

export default Bot;