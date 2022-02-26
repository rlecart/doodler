import Physics from "./Physics";
import WhoHavePhysics from "./WhoHavePhysics";

class Camera extends WhoHavePhysics {
  constructor() {
    super();
    this._physics = new Physics({
      gravity: {
        x: 0.65,
        y: 0.7,
      }
    });
  }
};

const cam = new Camera();

export default cam;