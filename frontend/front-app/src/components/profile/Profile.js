import "./Profile.css"
import React, { useEffect, useState, useRef } from "react";

import axios from 'axios';
import Header from "../navbar/Header";
import Footer from "../footer/Footer";

import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const containerRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/' + localStorage.getItem("id"))
          .then((res) => {
                console.log(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
          })
          .catch(error => {
                console.error(error);
          });
    }, []);

    return(
        <div>
            <div className="profile-container">
                <Header containerRef={containerRef}/>
                <div className="profile-icon">
                    <FontAwesomeIcon className="user-icon" icon={faUser}/>
                </div>
                <div className="profile-content">
                    <Container fluid="lg" >
                        <Row className="justify-content-md-center">
                            <Col md="auto" className="full-width">
                                <ListGroup className="user-data-list" variant="flush">
                                    <ListGroup.Item className="user-data-list-item">
                                        <div className="data-item">
                                            <p className="header-p">Email:</p>
                                            <p className="data-p">{email}</p> 
                                        </div>
                                        <hr />
                                    </ListGroup.Item>
                                    <ListGroup.Item className="user-data-list-item">
                                        <div className="data-item">
                                            <p className="header-p">Imię:</p>
                                            <p className="data-p">{name}</p>
                                        </div>
                                        <hr />
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Profile;