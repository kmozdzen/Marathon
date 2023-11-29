import "./Header.css"
import React from "react";
import Navbar from "react-bootstrap/Navbar";
const HomeHeader = () => {

    return(
        <Navbar expand="lg" bg="black" data-bs-theme="dark">
            <Navbar.Brand href="/"><h1 id="site-name-id">MarathonPro</h1></Navbar.Brand>
        </Navbar>
    );
}

export default HomeHeader;