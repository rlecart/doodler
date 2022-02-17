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
  }, []);

  React.useEffect(() => {
    console.log('yo');
    if (isInGame)
      g.current.start();
  }, [isInGame]);

  return (
    <canvas className='game' width={SIZE.width} height={SIZE.height}>
    </canvas>
  );
};

export default Game;