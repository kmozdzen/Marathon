import "./Stats.css";
import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from "react";
import axios from "axios";
import StatsProgressBar from "./StatsProgressBar";

const Stats = React.forwardRef((props, ref) => {
    const [distanceRun, setDistanceRun] = useState(0.0);
    const [distanceToRun, setDistanceToRun] = useState(0.0);
    const [walkTime, setWalkTime] = useState(null);
    const [runWalkTime, setRunWalkTime] = useState(null);
    const [totalRunWalkTime, setTotalRunWalkTime] = useState(null);
    const [totalWalkTime, setTotalWalkTime] = useState(null);
    
    const [now,setNow] = useState(15);

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

        axios.get('http://localhost:8080/api/run/get-total-run-walk-time/' + localStorage.getItem("id"))
            .then((res) => {
                setTotalRunWalkTime(res.data)  
            })
            .catch(error => {
                console.error(error);
            });

        axios.get('http://localhost:8080/api/run/get-total-walk-time/' + localStorage.getItem("id"))
            .then((res) => {
                setTotalWalkTime(res.data) 
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const javaTimeConverter = (time) =>{
        let days = Math.floor(time / (6000 * 24));
        let hours = Math.floor(time % (6000 * 24) / (6000));
        let minutes = Math.floor((time % 6000) / 100);
        let seconds = 0;

        let formattedDays = days.toString().padStart(2, '0');
        let formattedHours = hours.toString().padStart(2, '0');
        let formattedMinutes = minutes.toString().padStart(2, '0');
        let formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    return(
        <div ref={ref} className="stats-container">
            <Container fluid>
                <Row>
                    <Col className="empty-block" />
                    <Col className="stats-block">
                        <div className="stats-content">
                            <Container fluid>
                                <Row >
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{distanceRun}km</p>
                                            <h2 className="h2-style">Przebiegnięty Dystans</h2>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{distanceToRun.toFixed(1)}km</p>
                                            <h2 className="h2-style">Dystans do przebiegnięcia</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{javaTimeConverter(walkTime)}</p>
                                            <h2 className="h2-style">Czas marszu</h2>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{javaTimeConverter(totalWalkTime)}</p>
                                            <h2 className="h2-style">Całkowity czas marszu</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{javaTimeConverter(runWalkTime)}</p>
                                            <h2 className="h2-style">Czas marszobiegu</h2>
                                        </div>
                                    </Col>
                                    <Col lg={6} className="stats-col-style">
                                        <div className="stats-data">
                                            <p className="p-style">{javaTimeConverter(totalRunWalkTime)}</p>
                                            <h2 className="h2-style">Całkowity czas marszobiegu</h2>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
                <Row className="vh50">
                    <Col className="progress-bars-block">
                        <StatsProgressBar variant={"success"} name={"Przegiegnięty dystans"} now={(distanceRun/distanceToRun)*100}/>
                        <StatsProgressBar variant={"warning"} name={"Czas marszu"} now={(walkTime/totalWalkTime)*100}/>
                        <StatsProgressBar variant={"info"} name={"Czas marszobiegu"} now={(runWalkTime/totalRunWalkTime)*100}/>
                    </Col>
                    <Col className="empty-block" />
                </Row>
            </Container>
            </div>
    );
});

export default Stats;