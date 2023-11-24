import "./Stats.css";
import React from "react";

import Header from "../navbar/Header";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from "react";
import axios from "axios";

const Stats = React.forwardRef((props, ref) => {
    const [distanceRun, setDistanceRun] = useState(0.0);
    const [distanceToRun, setDistanceToRun] = useState(0.0);
    const [walkTime, setWalkTime] = useState(null);
    const [runWalkTime, setRunWalkTime] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/run/get-distance-run/' + localStorage.getItem("email"))
            .then((res) => {
                setDistanceRun(res.data)  
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://localhost:8080/api/run/get-distance-to-run/' + localStorage.getItem("email"))
            .then((res) => {
                setDistanceToRun(res.data)  
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://localhost:8080/api/run/get-walk-time/' + localStorage.getItem("email"))
            .then((res) => {
                setWalkTime(res.data)  
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://localhost:8080/api/run/get-run-walk-time/' + localStorage.getItem("email"))
            .then((res) => {
                setRunWalkTime(res.data)  
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return(
        <div ref={ref} className="stats-container">
            <div className="stats-content">
            <Container>
                <Row >
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">{distanceRun}km</p>
                            <h2 className="h2-style">Przebiegnięty Dystans</h2>
                        </div>
                    </Col>
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">{walkTime}</p>
                            <h2 className="h2-style">Czas marszu</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">{distanceToRun}km</p>
                            <h2 className="h2-style">Dystans do przebiegnięcia</h2>
                        </div>
                    </Col>
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">{runWalkTime}</p>
                            <h2 className="h2-style">Czas marszobiegu</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
});

export default Stats;