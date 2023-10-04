import "./Stats.css";
import React from "react";

import Header from "../navbar/Header";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from "react";

const YourPlan = () => {
    return(
        <div className="stats-container">
            <Header />
            <div className="stats-content">
            <Container>
                <Row >
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">0.0km</p>
                            <h2 className="h2-style">Total Distance Run</h2>
                        </div>
                    </Col>
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">0:0</p>
                            <h2 className="h2-style">Total Race Run</h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">0.0km</p>
                            <h2 className="h2-style">Avg Distance Run</h2>
                        </div>
                    </Col>
                    <Col md={3} className="stats-col-style">
                        <div className="stats-data">
                            <p className="p-style">0:0</p>
                            <h2 className="h2-style">Avg Pace</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default YourPlan;