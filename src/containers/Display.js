import React from 'react';
import { Col, Row } from 'reactstrap';
import '../style/Display.css';
import Game from './Game';
import ScoreBoard from './ScoreBoard';

const Display = ({ }) => {
  const [score, setScore] = React.useState(0);
  const [isInGame, setInGame] = React.useState(false);

  return (
    <div className='display'>
      <Game
        setScore={setScore}
        isInGame={isInGame}
        setInGame={setInGame}
      />
      <ScoreBoard
        score={score}
        isInGame={isInGame}
        setInGame={setInGame}
      />
    </div>
  );
};

export default Display;