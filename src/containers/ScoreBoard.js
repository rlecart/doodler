import '../style/ScoreBoard.css';

import { Fragment } from "react";

const ScoreBoard = ({ score, isInGame, setInGame }) => {
  return (
    <Fragment>
      <button className="scoreBoard" disabled={isInGame} onClick={() => setInGame(true)}>
        <p className="score">
          {isInGame ? `Score : ${score}` : `START`}
        </p>
      </button>
    </Fragment>
  );
};

export default ScoreBoard;