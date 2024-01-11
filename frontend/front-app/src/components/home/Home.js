import "./Home.css";
import React from "react";
import Container from "react-bootstrap/Container";
import HomeHeader from "../navbar/HomeHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

import Footer from "../footer/Footer";

const Home = () => {
    let navigate = useNavigate(); 
    const routeChangeToRegister = () =>{ 
        let path = `register`; 
        navigate(path);
    }

    const routeChangeToLogin = () =>{ 
        let path = `login`; 
        navigate(path);
    }

    return(
            <div>
            <div className="base-container">
                <Container fluid="lg">
                <Row className="home-container">
                        <Col md={{ span: 6, offset: 6 }} className="home-content text-center">
                            <Container fluid>
                                    <Row>
                                        <h1 className="brand-name">MarathonPro</h1>
                                    </Row>
                                    <Row>
                                        <h4 className="quote">"Pain is temporary. Quitting lasts forever." - Lance Armstrong</h4>
                                    </Row>
                                    <Row>
                                        <div className="buttons">
                                            <Button onClick={routeChangeToLogin} className="sign-in-button" variant="outline-light" size="lg">Zaloguj</Button>
                                            <Button onClick={routeChangeToRegister} variant="dark" size="lg">Rejestracja</Button>
                                        </div>
                                    </Row>
                            </Container>
                        </Col>
                </Row>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default Home;