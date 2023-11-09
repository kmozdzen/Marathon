import "./Questions.css";
import React from "react";
import { useState, useEffect  } from "react";

import Header from "../navbar/Header";
import YourPlan from "../yourplan/YourPlan"

import axios from "axios";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSeconds } from "date-fns";

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //index of the displayed question
    const [selectedRadius, setSelectedRadius] = useState(null); //radius of selected answer
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(); //questions with answers as a dict
    const [userAnswers, setUserAnswers] = useState([]); //answers user selected
    const [selectionRequired, setSelectionRequired] = useState(false); //to check any answer has been selected
    const [raceName, setRaceName] = useState("");
    const [raceDate, setRaceDate] = useState(new Date());
    const [toQuestions, setToQuestions] = useState(false);
  
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

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedRadius(null);
        } 
        else {
            setSelectionRequired(true);
        }
    };
    
    const generatePlan = () => {
        axios.post(
                    'http://localhost:8080/api/answer/answers-to-user/' + localStorage.getItem("email"),
                    {
                        answers: userAnswers,
                    }
                )
                .then((res) => {
                    const formattedDate = `${raceDate.getFullYear()}-${(raceDate.getMonth() + 1).toString().padStart(2, '0')}-${raceDate.getDate().toString().padStart(2, '0')}`;
                    axios.post(
                        'http://localhost:8080/api/yourplan/create/' + localStorage.getItem("email"),
                        {
                            answers: userAnswers,
                            raceName: raceName,
                            raceDate: formattedDate,
                        }
                    )
                    .then((res) => {
                        window.location.reload(false);
                    })
                    .catch(error => {
                          console.error(error);
                    });
                })
                .catch(error => {
                      console.error(error);
                });
    }

    const handleToQuestions = () => {
        setToQuestions(true);
    }

    return(
        <div className="questions-container">
            <Header />
            <div className="questions-block">
                <div className="questions">
                    <Form>
                        {currentQuestionIndex === questions.length?
                            <div>
                                <Button onClick={generatePlan} variant="outline-light">
                                    Done
                                </Button>
                            </div>
                        :
                        <div>
                            {!toQuestions ? 
                            <div>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label as="legend" row="" sm={2}>
                                        Enter the name of the race
                                    </Form.Label>
                                    <Col sm={10} className="answers">
                                        <Form.Control 
                                            onChange={(name) => {setRaceName(name.target.value)}} 
                                            type="text" 
                                            placeholder="race" 
                                            value={raceName}
                                        />
                                    </Col>
                                    <Form.Label as="legend" row="" sm={2}>
                                        Choose race date
                                    </Form.Label>
                                    <Col sm={10} className="answers">
                                        <DatePicker selected={raceDate} onChange={(date) => setRaceDate(date)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" md="auto">
                                    <Col sm={{ span: 10}}>
                                        <Button onClick={handleToQuestions} variant="outline-light">
                                            Next
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>
                            :
                            <div>
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
                                            Next
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>
                            }
                            </div>
                        }
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Questions;