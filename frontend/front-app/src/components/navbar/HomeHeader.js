import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const HomeHeader = () => {
    return(
        <Navbar expand="lg" bg="black" data-bs-theme="dark">
            <Navbar.Brand href="/"><h1>MarathonPro</h1></Navbar.Brand>
        </Navbar>
    );
}

export default HomeHeader;