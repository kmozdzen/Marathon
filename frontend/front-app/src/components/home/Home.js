import "./Home.css";
import React from "react";
import Container from "react-bootstrap/Container";
import HomeHeader from "../navbar/HomeHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

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
        <div className="base-container">
            <HomeHeader />
            <div className="home-container">
                <div className="left-side">
                 
                </div>
                <div className="right-side">
                    <div className="buttons">
                        <Button onClick={routeChangeToLogin} className="sign-in-button" variant="outline-light" size="lg">Sign in</Button>
                        <Button onClick={routeChangeToRegister} variant="dark" size="lg">Register</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;