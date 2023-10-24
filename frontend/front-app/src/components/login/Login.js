import "../register/Register.css";
import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import YourPlan from "../yourplan/YourPlan";

const Register = () =>{
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [noEmail, setNoEmail] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        login();
        setValidated(true);
    };

    async function login(event) {
        console.log(email, password);   
        try {
          await axios.post("http://localhost:8080/api/auth/authenticate", {
            email: email,
            password: password,
            }).then((res) =>
            {
             console.log(res.data.token);
             if(res.data.message === "Login success")
             {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('name', res.data.name);
                return <YourPlan/>
             }
             if(res.data.message === "Email not exits")
             {
                setError(false);
                setNoEmail(true);
             }else{
                setNoEmail(false);
                setError(true);
             }
             
          }, fail => {
           console.error(fail); // Error!
    });
            }
    
            catch (err) {
            alert(err);
            }
        
        }

    return(
        <Container fluid>
            <Row>
                <Col className="brand-name-side">
                    <a href="/"><h1 className="site-name">MarathonPro</h1></a>
                </Col>
                <Col className="sign-in-side data-form">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-6">
                            <Form.Group as={Col} md="10" controlId="validationCustom01">
                                <Form.Control
                                    className="input-style"
                                    required
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-6">
                            <Form.Group as={Col} md="10" controlId="validationCustom02">
                                <Form.Control
                                    className="input-style"
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button className="sign-in-button" type="submit" variant="outline-light" size="lg">Sign in</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register