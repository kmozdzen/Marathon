import "./Home.css";
import React from "react";
import Container from "react-bootstrap/Container";
import HomeHeader from "../navbar/HomeHeader";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Home = () => {
    return(
        <div className="base-container">
            <HomeHeader />
            <div className="home-container">
                <div className="d-grid gap-2 buttons">
                    <Button variant="dark" size="lg">Dark</Button>
                    <Button variant="dark" size="lg">Link</Button>
                </div>
            </div>
        </div>
    );
}

export default Home;