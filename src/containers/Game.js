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

  React.useEffect(() => {
    g.current = new GameObject();
    window.addEventListener('keydown', e => {
      if (e.key === ' ')
        g.current.jump();
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