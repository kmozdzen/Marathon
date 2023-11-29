import './EarlyDateAlert.css'
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

function EarlyDateAlert(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert className='early-alert' variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Czy jesteś pewien/na?</Alert.Heading>
        <p>
          {props.text}
        </p>
      </Alert>
    );
  }
  return <FontAwesomeIcon id='alert-icon' onClick={() => setShow(true)} icon={faTriangleExclamation}/>
}

export default EarlyDateAlert;