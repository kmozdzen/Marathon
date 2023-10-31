import "./Register.css";
import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

import axios from 'axios';
import Footer from "../footer/Footer";

const Register = () =>{
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          register(event);
        }
    
        setValidated(true);
      };
    
    async function register(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/api/auth/register", {
          email: email,
          password: password,
          name: name,
          }).then((res) => {
            if(res.data.message === "Success"){
                alert("Success");
            }else{

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
        <div>
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
                        <Row className="mb-6">
                            <Form.Group as={Col} md="10" controlId="validationCustom03">
                                <Form.Control
                                    className="input-style"
                                    required
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(event) => {
                                        setName(event.target.value);
                                    }}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit" variant="dark" size="lg" className="register-button">Register</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        <Footer />
        </div>
    );
}

export default Register