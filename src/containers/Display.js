import { Col, Row } from 'reactstrap';
import '../style/Display.css';
import Game from './Game';

const Display = ({ }) => {
  return (
    <div className='display'>
      <Game>
      </Game>
    </div>
  );
};

export default Display;