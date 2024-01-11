import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import ChatRoom from '../friends/ChatRoom';

function FriendsOffCanvas(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <FontAwesomeIcon className="logout-icon-style add-pointer" onClick={handleShow}  icon={faUserGroup}/>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Znajomi</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatRoom show={show}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default FriendsOffCanvas;