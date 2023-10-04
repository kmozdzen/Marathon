import "./Questions.css";
import React from "react";

import Header from "../navbar/Header";

import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const questions_tab = ['Pytanie 1', 'Pytanie 2', 'Pytanie 3'];
const answers_tab = {'Pytanie 1': ['1', '2', '3'], 'Pytanie 2': ['4', '5', '6'], 'Pytanie 3': ['7', '8', '9'],}

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedRadius, setSelectedRadius] = useState(null);
    const [answers, setAnswers] = useState([]);

    const handleRadiusChange = (radius) => {
        setSelectedRadius(radius);
    };

    const handleNextQuestion = () => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = selectedRadius;
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions_tab.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedRadius(null); // Reset wyboru radiusu dla nowego pytania
        } else {
            console.log('Odpowiedzi:', answers); // Wyświetl odpowiedzi po ostatnim pytaniu
        }
    };

    return(
        <div className="questions-container">
            <Header />
            <div className="questions-block">
                <div className="questions">
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" row sm={2}>
                                {questions_tab[currentQuestionIndex]}
                            </Form.Label>
                            <Col sm={10} className="answers">
                                <Form.Check
                                type="radio"
                                label={answers_tab[questions_tab[currentQuestionIndex]][0]}
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                checked={selectedRadius === 'opcja1'}
                                onChange={() => handleRadiusChange('opcja1')}
                                />
                                <Form.Check
                                type="radio"
                                label="second radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                checked={selectedRadius === 'opcja2'}
                                onChange={() => handleRadiusChange('opcja2')}
                                />
                                <Form.Check
                                type="radio"
                                label="third radio"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                checked={selectedRadius === 'opcja3'}
                                onChange={() => handleRadiusChange('opcja3')}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" md="auto">
                            <Col sm={{ span: 10}}>
                                <Button onClick={handleNextQuestion} variant="outline-light">
                                    {currentQuestionIndex < questions_tab.length - 1 ? 'Next' : 'Done'}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Questions;