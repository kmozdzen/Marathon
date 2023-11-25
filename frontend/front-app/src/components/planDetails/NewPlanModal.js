import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

const NewPlanModal = (props) => {
  
    const createNewPlan = () => {
        axios.delete('http://localhost:8080/api/yourplan/remove/' + localStorage.getItem("id"))
          .then((res) => {
            window.location.reload(false);
          })
          .catch(error => {
                console.error(error);
          });
    }
  
    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Czy jesteś pewien/pewna?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Nowy plan</h4>
        <p>
          Stworzenie nowego planu spowoduje usunięcie planu bieżącego.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={createNewPlan}>Akceptuj</Button>
        <Button variant="danger" onClick={props.onHide}>Zamknij</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewPlanModal;