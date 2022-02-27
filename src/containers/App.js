import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import '../style/App.css';
import '../style/ft_css/ft_css.css';
import Display from './Display';
import { io } from "socket.io-client";

const App = ({ }) => {
  const socket = React.useRef();

  React.useEffect(() => {
    socket.current = io("http://localhost:8000");
    socket.current.on('connection', () => {
      console.log('connected')
    })
  }, []);

  return (
    <Fragment>
      <div className='screen'>
        <Display />
      </div>
    </Fragment>
  );
};

export default App;
