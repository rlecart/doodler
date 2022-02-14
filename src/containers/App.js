import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import '../style/App.css';
import '../style/ft_css/ft_css.css';
import Display from './Display';

const App = ({ }) => {
  return (
    <Fragment>
      <div className='screen'>
        <Display />
      </div>
    </Fragment>
  );
};

export default App;
