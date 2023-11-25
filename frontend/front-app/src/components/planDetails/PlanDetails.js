import "./PlanDetails.css"
import React, { useEffect, useState, useRef } from "react";

import axios from 'axios';
import Header from "../navbar/Header";
import Footer from "../footer/Footer";

import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import NewPlanModal from "./NewPlanModal";

import { ListGroup } from "react-bootstrap";

const PlanDetails = () => {
    const [name, setName] = useState("");
    const [expirience, setExpirience] = useState("");
    const [goal, setGoal] = useState("");
    const [raceDate, setRaceDate] = useState("");
    const [modalShow, setModalShow] = React.useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/get-user-answers/' + localStorage.getItem("email"))
          .then((res) => {
                console.log(res.data)
                setName(res.data[0]);
                setExpirience(res.data[1]);
                setGoal(res.data[2]);
                setRaceDate(res.data[3]);
    
          })
          .catch(error => {
                console.error(error);
          });
    }, []);

    return(
        <div>
            <div className="plan-details-container">
                <Header containerRef={containerRef}/>
                <div className="plan-details-content">
                    <Container fluid="lg" >
                        <Row className="justify-content-md-center">
                            <Col className="full-width">
                                <ListGroup className="user-data-list" variant="flush">
                                        <ListGroup.Item className="user-data-list-item">
                                            <div className="data-item">
                                                <p className="header-p">Nazwa:</p>
                                                <p className="data-p">{name}</p> 
                                            </div>
                                            <hr />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="user-data-list-item">
                                            <div className="data-item">
                                                <p className="header-p">Doświadczenie:</p>
                                                <p className="data-p">{expirience}</p>
                                            </div>
                                            <hr />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="user-data-list-item">
                                            <div className="data-item">
                                                <p className="header-p">Cel:</p>
                                                <p className="data-p">{goal}</p> 
                                            </div>
                                            <hr />
                                        </ListGroup.Item>
                                        <ListGroup.Item className="user-data-list-item">
                                            <div className="data-item">
                                                <p className="header-p">Data wyścigu:</p>
                                                <p className="data-p">{raceDate}</p>
                                            </div>
                                            <hr />
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <div className="details-text-style">
                                        <Button variant="danger" onClick={() => setModalShow(true)}>
                                            Stwórz nowy plan
                                        </Button>

                                        <NewPlanModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default PlanDetails;