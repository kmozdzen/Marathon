import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const MyInfoOverlay = (props) => {
    const [myInfo, setMyInfo] = useState(props.text);
    const [editedMyInfo, setEditedMyInfo] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const onClickSetMyInfo = () => {
        axios.put('http://localhost:8080/api/run/my-info/' + props.idRun, 
            {
                myInfo: editedMyInfo
            }
        )
          .then((res) => {
            console.log('succes')
            setMyInfo(editedMyInfo);
          })
          .catch(error => {
                console.error(error);
          });
    }

    const toggleInputMyInfo = () => {
        setIsEdit(!isEdit);
    }
    const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div className='my-info-body'>
            <p className='my-info-text'>{myInfo}</p>
            <hr></hr>
            <FontAwesomeIcon onClick={toggleInputMyInfo} className="pen-icon" icon={faPenToSquare}/>
            {isEdit ? 
                <div className='input-my-info-panel'>
                    <Form.Control 
                        className='input-my-info' 
                        type="text" 
                        onChange={(event) => {
                            setEditedMyInfo(event.target.value);
                        }}
                    />
                    <Button variant='danger' onClick={onClickSetMyInfo}>Zapisz</Button>
                </div>
                :
                null
            }
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
       <FontAwesomeIcon className="my-info-icon" icon={faNoteSticky}/>
    </OverlayTrigger>
  );
};

export default MyInfoOverlay;