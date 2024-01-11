import "./InfoCollapse.css";

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const InfoCollapse = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <FontAwesomeIcon 
        onClick={() => setOpen(!open)} 
        icon={faChevronDown} 
        aria-controls="example-collapse-text"
        aria-expanded={open}
        id='down-icon-style'
        />
      <Collapse in={open}>
        <div id="info-collapse-text">
          {props.text}
        </div>
      </Collapse>
    </>
  );
}

export default InfoCollapse;