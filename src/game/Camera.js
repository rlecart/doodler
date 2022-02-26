class Camera {
  constructor() {
    this._translation = {
      y: 0,
      x: 0,
    };
  }

  get translation() {
    return (this._translation);
  }

  set translation(value) {
    this._translation = value;
  }
};

const cam = new Camera();

module.exports = cam;