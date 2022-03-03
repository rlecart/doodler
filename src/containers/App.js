import React, { Fragment } from 'react';
import '../style/App.css';
import '../style/ft_css/ft_css.css';
import Display from '../components/Display';
import io from "socket.io-client";
import { connect } from 'react-redux';

import { addSocket } from '../actions/socketAction';
import options from '../options';
import Game from './Game';
import ScoreBoard from './ScoreBoard';

const App = ({
  dispatch,
  socketReducer,
}) => {
  const [score, setScore] = React.useState(0);
  const [isInGame, setInGame] = React.useState(false);
  const [socketConnected, setConnected] = React.useState(false);

  React.useEffect(() => {
    let socket;

    if (!socketReducer.socket) {
      console.log('yo');
      socket = io(`http://${options.back.path}:${options.back.port}`);
      socket.on('connect', () => {
        console.log('socket connected');
        setConnected(true);
      });
      addSocket(dispatch, socket);
    }
  }, []);

  return (
    <Fragment>
      <Display>
        <Game
          setScore={setScore}
          isInGame={isInGame}
          setInGame={setInGame}
          socketConnected={socketConnected}
        />
        <ScoreBoard
          score={score}
          isInGame={isInGame}
          setInGame={setInGame}
          socketConnected={socketConnected}
        />
      </Display>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return (state);
};

export default connect(mapStateToProps)(App);
