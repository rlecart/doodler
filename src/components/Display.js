import '../style/Display.css';

const Display = ({ children }) => (
  <div className='screen'>
    <div className='display'>
      {children}
    </div>
  </div>
);

export default Display;