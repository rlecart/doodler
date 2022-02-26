class WhoHavePhysics {
  get physics() {
    return (this._physics);
  }
  get pos() {
    return (this.physics.pos);
  }
  get length() {
    return (this.physics.length);
  }
  get translation() {
    return (this.physics.translation);
  }
  get velocity() {
    return (this.physics.velocity);
  }
  get gravity() {
    return (this.physics.gravity);
  }
}

export default WhoHavePhysics;