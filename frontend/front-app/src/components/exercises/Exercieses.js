import "./Exercises.css";
import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import ExerciseData from "./ExerciseData";

const Exercises = React.forwardRef((props, ref) => {
   
    const variant = [
        'Primary',
        'Secondary',
        'Success',
        'Danger',
        'Warning',
        'Info',
        'Light',
        'Dark',
      ];
   
    return(
        <div ref={ref} className="exercises-container">
            <Container fluid className="exercises-content">
                <Row>
                    {ExerciseData.map((exercise,index) => {
                        return <Col key={index} className="justify-content-center" lg={3} md={4} sm={6}>
                                    <ExerciseCard 
                                        variant={variant[Math.floor(Math.random()*variant.length)]}
                                        name={exercise.name}
                                        description={exercise.description}
                                    />
                               </Col>
                    })}
                </Row>
            </Container>
            </div>
    );
});

export default Exercises;