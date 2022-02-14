import '../style/ScoreBoard.css'

import { Fragment } from "react";

const ScoreBoard = ({ score }) => {
  return (
    <Fragment>
      <div className="scoreBoard">
        <p className="score">Score : {score}</p>
      </div>
    </Fragment>
  );
};

export default ScoreBoard;