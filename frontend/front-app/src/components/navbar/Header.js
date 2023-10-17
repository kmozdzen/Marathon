import "./Header.css"
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import axios from 'axios';

const Header = () => {
    const logout = () => axios.post('http://localhost:8080/api/auth/logout',{
    token: localStorage.getItem("token")
    })
        .then((response) => {
        window.location.reload(false);
        }
        )
        .catch((err) => {
            console.log(err.message);
        });

    return(
        <Navbar expand="lg" bg="black" data-bs-theme="dark" className="navbar-header-style">
            <Navbar.Brand href="/"><h1 id="site-name-id">MarathonPro</h1></Navbar.Brand>
            <Nav className="m-auto">
                <Nav.Link href="/yourplan" className="nav-link-header-style">Your Plan</Nav.Link>
                <Nav.Link href="/stats" className="nav-link-header-style">Stats</Nav.Link>
                <Nav.Link href="#"><button onClick={logout}/></Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;