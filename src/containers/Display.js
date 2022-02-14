import React from 'react';
import { Col, Row } from 'reactstrap';
import '../style/Display.css';
import Game from './Game';
import ScoreBoard from './ScoreBoard';

const Display = ({ }) => {
  const [score, setScore] = React.useState(0);

  return (
    <div className='display'>
      <Game setScore={setScore} />
      <ScoreBoard score={score} />
    </div>
  );
};

export default Display;