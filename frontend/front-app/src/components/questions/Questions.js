import "./Questions.css";
import React from "react";
import { useState, useEffect } from "react";

import HomeHeader from "../navbar/HomeHeader";

import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addSeconds, set } from "date-fns";
import { Container } from "react-bootstrap";
import InfoCollapse from "./infoCollabse/InfoCollapse";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { el, tr } from "date-fns/locale";
import EarlyDateAlert from "./earlyDateAlert/EarlyDateAlert";

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //index of the displayed question
  const [selectedRadius, setSelectedRadius] = useState(null); //radius of selected answer
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(); //questions with answers as a dict
  const [userAnswers, setUserAnswers] = useState([]); //answers user selected
  const [selectionRequired, setSelectionRequired] = useState(false); //to check any answer has been selected
  const [raceName, setRaceName] = useState("");
  const [mmTime, setMmTime] = useState('10:00');
  const [raceDate, setRaceDate] = useState(new Date());
  const [toQuestions, setToQuestions] = useState(false);
  const [earlyDateInfo, setEarlyDateInfo] = useState(null);
  const [isEarlyDate, setIsEarlyDate] = useState(false);

  //retrieves questions from the database
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/question/")
      .then((res) => {
        const updatedQuestions = [];
        const updatedAnswersDict = {};

        res.data.forEach((element) => {
          updatedQuestions.push(element.content);
          updatedAnswersDict[element.content] = element.answers.map(
            (item) => item.content
          );
        });

        setQuestions(updatedQuestions);
        setAnswers(updatedAnswersDict);
      })
      .catch((error) => {
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

      if(currentQuestionIndex + 1 === questions.length){
        tooEarlyDate();
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedRadius(null);
    } else {
      setSelectionRequired(true);
    }
  };

   //move to the previous question
   const handlePreviousQuestion = () => {
      if(currentQuestionIndex > 0){
        setCurrentQuestionIndex(currentQuestionIndex -1);
        setToQuestions(true);
      } else {
        setToQuestions(false);
      }
  };

  const generatePlan = () => {
      axios
        .post(
          "http://localhost:8080/api/answer/answers-to-user/" +
            localStorage.getItem("email"),
          {
            answers: userAnswers,
          }
        )
        .then((res) => {
          const formattedDate = `${raceDate.getFullYear()}-${(
            raceDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${raceDate.getDate().toString().padStart(2, "0")}`;
  
          axios
            .post(
              "http://localhost:8080/api/yourplan/create/" +
                localStorage.getItem("email"),
              {
                answers: userAnswers,
                raceName: raceName,
                raceDate: formattedDate,
                mmTime: mmTime,
              }
            )
            .then((res) => {
              window.location.reload(false);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const handleToQuestions = () => {
    setToQuestions(true);
  };
  
  const tooEarlyDate = () => {
    const currentDate = new Date(Date.now());
    let goal = userAnswers[1];
    let diffDays = parseInt((raceDate - currentDate) / (1000 * 60 * 60 * 24), 10); //days difference current date and race date 
    let weeks = Math.floor(diffDays / 7);

    if(goal === 'maraton' && weeks < 18){
      setEarlyDateInfo("Zbyt mała ilość czasu. W celu wygenerowania prawidłowego planu, rekomendowane jest co najmniej 18 tygodni treningu do maratonu");
      setIsEarlyDate(true)
    } 
    else if(goal === 'pół maraton' && weeks < 12){
      setEarlyDateInfo("Zbyt mała ilość czasu. W celu wygenerowania prawidłowego planu, rekomendowane jest co najmniej 12 tygodni treningu do pół maratonu");
      setIsEarlyDate(true)

    } 
    else if(goal === 'bieg na 10 mil' && weeks < 9){
      setEarlyDateInfo("Zbyt mała ilość czasu. W celu wygenerowania prawidłowego planu, rekomendowane jest co najmniej 9 tygodni treningu do biegu na 10 mil");
      setIsEarlyDate(true)
    }else{
      setIsEarlyDate(false)
    }
  }

  return (
    <div className="questions-container">
      <HomeHeader />
      <div className="questions-block">
        <div className="questions">
          <Form>
            {currentQuestionIndex === questions.length ? (
              <div className="send-questions">
                <div className="summary">
                  <div className="summary-single-item">
                    <h2>Nazwa:</h2>
                    <p>{raceName === "" ? "wyścig" : raceName}</p>
                  </div>
                  <div className="summary-single-item">
                    <h2>Data:</h2>
                    <p>{raceDate.toLocaleDateString("pl-PL", { day: "numeric", month: "numeric", year: "numeric" })}</p>
                  </div>
                  <div className="summary-single-item">
                    <h2>Magiczna mila:</h2>
                    <p>{mmTime}</p>
                  </div>
                  <div className="summary-single-item">
                    <h2>Doświadczenie:</h2>
                    <p>{userAnswers[0]}</p>
                  </div>
                  <div className="summary-single-item">
                    <h2>Cel:</h2>
                    <p>{userAnswers[1]}</p>
                  </div>
                </div>
                <div className="summary-buttons">
                  {isEarlyDate ?
                    <>
                      <EarlyDateAlert text={earlyDateInfo}/>
                    </>
                    :
                    null
                  } 
                  <Button
                    onClick={handlePreviousQuestion}
                    variant="light"
                    className="previous-button"
                  >
                    Cofnij
                  </Button>
                  <Button 
                    onClick={generatePlan} 
                    variant="outline-light"
                    className="create-plan-button text-nowrap"
                    >
                    Stwórz plan
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {!toQuestions ? (
                  <div>
                    <Form.Group as={Row} className="question-row mb-3">
                      <Form.Label as="legend" row="" sm={2} className="question-label">
                        Podaj nazwę wyścigu
                      </Form.Label>
                      <Col sm={10} className="answers">
                        <Form.Control
                          onChange={(name) => {
                            setRaceName(name.target.value);
                          }}
                          type="text"
                          placeholder="wyścig"
                          value={raceName}
                        />
                      </Col>
                      <Form.Label as="legend" row="" sm={2} className="question-label">
                        Wybierz datę maratonu
                      </Form.Label>
                      <Col sm={10} className="answers" >
                        <DatePicker
                          selected={raceDate}
                          onChange={(date) => setRaceDate(date)}
                          className="datepicker-race-date"
                          minDate={new Date()} // It does not allow you to select a date from the past
                          maxDate={addSeconds(new Date(), 31536000)} // max 1 year ahead
                        />
                      </Col>
                      <Form.Label as="legend" row="" sm={2} className="question-label">
                        Czas magicznej mili 
                        <InfoCollapse 
                          text={
                            "Podaj swój czas magicznej mili. Wykonaj bieg jednej mili, czyli 1600m, swoim najszybszym tempem i podaj czas ukończenia biegu. Średni wynik to 10:00."
                          }
                        />
                      </Form.Label>
                      <Col sm={10} className="answers">
                        <TimePicker 
                          onChange={(time)=> setMmTime(time)} 
                          value={mmTime} 
                          disableClock={true}
                          className="time-picker-style"
                          minTime="04:00:00"
                          maxTime="12:59:00"
                          clearIcon={null}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" md="auto">
                      <Col sm={{ span: 10 }} className="question-row">
                        <Button
                          onClick={handleToQuestions}
                          variant="outline-light"
                          className="next-button"
                        >
                          Dalej
                        </Button>
                      </Col>
                    </Form.Group>
                  </div>
                ) : (
                  <div>
                    <Form.Group as={Row} className="mb-3" >
                      <Col className="question-row">
                        <Form.Label as="legend" row="" sm={2} className="question-label">
                          {questions[currentQuestionIndex]}
                        </Form.Label>
                      </Col>
                      <Col sm={10} className="answers">
                        {answers &&
                          answers[questions[currentQuestionIndex]].map(
                            (answer) => (
                              <Form.Check
                                key={answer}
                                type="radio"
                                label={answer}
                                checked={answer === selectedRadius}
                                onChange={() => handleRadiusChange(answer)}
                              />
                            )
                          )}
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="next-prev-but mb-3" md="auto">
                    {currentQuestionIndex > -1 ? (
                      <Col sm={{ span: 5 }} className="question-row">
                        <Button onClick={handlePreviousQuestion} variant="light">
                          Cofnij
                        </Button>
                      </Col>
                    ) : null}
                    <Col sm={{ span: 5 }} className="question-row">
                      <Button onClick={handleNextQuestion} variant="outline-light" className="next-button">
                        Dalej
                      </Button>
                    </Col>
                    </Form.Group>
                  </div>
                )}
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Questions;
