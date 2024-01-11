import ProgressBar from 'react-bootstrap/ProgressBar';

const StatsProgressBar = (props) => {
  
  const fixedNow = props.now.toFixed(2)
  
  return <div className='stats-progress-bar-container'>
    <h4>{props.name}</h4>
    <ProgressBar className='stats-progress-bar-style' variant={props.variant} now={fixedNow} label={`${fixedNow}%`} />
  </div>;
}

export default StatsProgressBar;