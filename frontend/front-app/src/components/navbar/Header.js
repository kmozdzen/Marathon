import "./Header.css"
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios';

import { useNavigate } from "react-router-dom";

const Header = ({ containerRef }) => {
    
    const navigate = useNavigate();

    const handlePlanDetailsClick = () => {
        navigate("/plan-details");
    }
    
    const handleProfileClick = () => {
        navigate("/profile");
    }

    const handleYourPlanClick = () => {
        navigate("/yourplan");
    }

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
        } else
        {
            navigate("/stats");
        }
    }
    
    return(
        <Navbar expand="md" bg="black" data-bs-theme="dark" className="navbar-header-style">
                <Navbar.Brand href="/"><h1 id="site-name-id">MarathonPro</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="m-auto">
                    <Nav.Link onClick={handleYourPlanClick} className="nav-link-header-style">Twój plan</Nav.Link>
                    <Nav.Link onClick={scrollToContainer} className="nav-link-header-style">Statystyki</Nav.Link>
                </Nav>
                <Nav>
                    <Dropdown align="end">
                        <Dropdown.Toggle id="dropdown-settings">
                            <FontAwesomeIcon className="settings-icon-style" icon={faGear}/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={handleProfileClick}>Profile</Dropdown.Item>
                            <Dropdown.Item href="#" onClick={handlePlanDetailsClick}>Plan details</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#"><FontAwesomeIcon className="logout-icon-style" onClick={logout}  icon={faArrowRightFromBracket}/></Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;