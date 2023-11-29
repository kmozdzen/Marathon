import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

const InfoOverlay = (props) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{props.name}</Popover.Header>
      <Popover.Body>
        Bieg przy wykorzystaniu metody Gallowaya
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
       <FontAwesomeIcon className="info-icon" icon={faCircleInfo}/>
    </OverlayTrigger>
  );
};

export default InfoOverlay;