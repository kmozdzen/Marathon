import "./Header.css"
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useRef } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

const Header = ({containerRef}) => {
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

    const scrollToContainer = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    return(
        <Navbar expand="md" bg="black" data-bs-theme="dark" className="navbar-header-style">
                <Navbar.Brand href="/"><h1 id="site-name-id">MarathonPro</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="m-auto">
                    <Nav.Link href="/yourplan" className="nav-link-header-style">Twój plan</Nav.Link>
                    <Nav.Link onClick={scrollToContainer} className="nav-link-header-style">Statystyki</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="#"><FontAwesomeIcon className="logout-icon-style" onClick={logout}  icon={faArrowRightFromBracket}/></Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;