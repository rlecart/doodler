import '../style/Game.css';
import { Col } from "reactstrap";
import React from 'react';
import { connect } from 'react-redux';
import GameObject from '../game/GameObject';
import { SIZE } from '../game/options/options';

const Game = ({
  dispatch,
  socketReducer,
  setScore,
  isInGame,
  setInGame,
  socketConnected,
}) => {
  const g = React.useRef();
  const isPressed = React.useRef({});

  React.useEffect(() => {
    g.current = new GameObject();
    window.addEventListener('keydown', e => {
      if (!isPressed.current[e.key]) {
        isPressed.current = { ...isPressed.current, [e.key]: true };
        // console.log(e.key);
        if (e.key === ' ')
          g.current.player.jump();
        if (e.key === 'ArrowLeft'
          || e.key === 'ArrowRight')
          g.current.player.startMove(e.key);
        else if (e.key === 'ArrowUp')
          g.current.moveCamera(e.key);
        else if (e.key === 'a')
          g.current.player.startMove('ArrowLeft');
        else if (e.key === 'd')
          g.current.player.startMove('ArrowRight');
        else if (e.key === 'p')
          g.current.printThis();
      }
    });
    window.addEventListener('keyup', e => {
      if (isPressed.current[e.key]) {
        isPressed.current = { ...isPressed.current, [e.key]: false };
        // console.log('aaaaa', e.key);
        if (e.key === 'ArrowLeft'
          || e.key === 'ArrowRight')
          g.current.player.stopMove(e.key);
        else if (e.key === 'ArrowDown')
          g.current.moveCamera(e.key);
        else if (e.key === 'a')
          g.current.player.stopMove('ArrowLeft');
        else if (e.key === 'd')
          g.current.player.stopMove('ArrowRight');
      }
    });
  }, []);

  React.useEffect(() => {
    // console.log('yo');
    if (isInGame)
      g.current.start();
    else
      g.current.init();
  }, [isInGame]);

  React.useEffect(() => {
    if (socketConnected && socketReducer && socketReducer.socket && g.current) {
      g.current.socket = socketReducer.socket;
    }
  }, [socketConnected]);

  return (
    <canvas className='game' width={SIZE.width} height={SIZE.height}>
    </canvas>
  );
};

const mapStateToProps = (state) => {
  return (state);
};

export default connect(mapStateToProps)(Game);
