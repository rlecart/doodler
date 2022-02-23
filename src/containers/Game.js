import '../style/Game.css';
import { Col } from "reactstrap";
import React from 'react';
import GameObject from '../game/GameObject';
import { SIZE } from '../game/options/options';

const Game = ({
  setScore,
  isInGame,
  setInGame,
}) => {
  const g = React.useRef();
  const isPressed = React.useRef({});

  React.useEffect(() => {
    g.current = new GameObject();
    window.addEventListener('keydown', e => {
      if (!isPressed.current[e.key]) {
        isPressed.current = { ...isPressed.current, [e.key]: true };
        console.log(e.key);
        if (e.key === ' ')
          g.current.jump();
        else if (e.key === 'e')
          g.current.stop();
      }
    });
    window.addEventListener('keyup', e => {
      if (isPressed.current[e.key]) {
        isPressed.current = { ...isPressed.current, [e.key]: false };
        console.log('aaaaa', e.key);
      }
    });
  }, []);

  React.useEffect(() => {
    console.log('yo');
    if (isInGame)
      g.current.startInterval();
    else {
      g.current.init();
      g.current.loop();
    }
  }, [isInGame]);

  return (
    <canvas className='game' width={SIZE.width} height={SIZE.height}>
    </canvas>
  );
};

export default Game;