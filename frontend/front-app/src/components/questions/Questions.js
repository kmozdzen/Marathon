import "./Questions.css";
import React from "react";
import { useState, useEffect  } from "react";

import Header from "../navbar/Header";

import axios from "axios";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //index of the displayed question
    const [selectedRadius, setSelectedRadius] = useState(null); //radius of selected answer
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(); //questions with answers as a dict
    const [userAnswers, setUserAnswers] = useState([]); //answers user selected
    const [selectionRequired, setSelectionRequired] = useState(false); //to check any answer has been selected

    //retrieves questions from the database
    useEffect(() => {
        axios.get('http://localhost:8080/api/question/')
          .then((res) => {
            const updatedQuestions = [];
            const updatedAnswersDict = {};
            
            res.data.forEach(element => {
               updatedQuestions.push(element.content)
               updatedAnswersDict[element.content] = element.answers.map(item => item.content);
            })

            setQuestions(updatedQuestions);
            setAnswers(updatedAnswersDict);
          })
          .catch(error => {
                console.error(error);
          });
    }, []);

    //select the answer
    const handleRadiusChange = (radius) => {
        setSelectedRadius(radius);
        setSelectionRequired(false);
    };
    
    //move to the next question
    const handleNextQuestion = () => {
        //it checks if is selected answer then add answer to user answers
        if (selectedRadius !== null) {
            const updatedUserAnswers = [...userAnswers];
            updatedUserAnswers[currentQuestionIndex] = selectedRadius;
            setUserAnswers(updatedUserAnswers);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedRadius(null);
            }
            else{
                axios.post(
                    'http://localhost:8080/api/answer/answers-to-user/' + localStorage.getItem("email"),
                    {
                        answers: userAnswers
                    }
                )
                .then((res) => {
                    console.log(res.data)
                    axios.post(
                        'http://localhost:8080/api/yourplan/create/' + localStorage.getItem("email"),
                        {
                            answers: userAnswers
                        }
                    )
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch(error => {
                          console.error(error);
                    });
                })
                .catch(error => {
                      console.error(error);
                });
            } 
        } 
        else {
            setSelectionRequired(true);
        }
    };

    return(
        <div className="questions-container">
            <Header />
            <div className="questions-block">
                <div className="questions">
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" row="" sm={2}>
                                {questions[currentQuestionIndex]}
                            </Form.Label>
                            <Col sm={10} className="answers">
                            {answers && answers[questions[currentQuestionIndex]]
                                .map(answer => 
                                    <Form.Check key={answer}
                                    type="radio"
                                    label={answer}
                                    checked={answer === selectedRadius}
                                    onChange={() => handleRadiusChange(answer)}
                                    />
                            )}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" md="auto">
                            <Col sm={{ span: 10}}>
                                <Button onClick={handleNextQuestion} variant="outline-light">
                                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Done'}
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