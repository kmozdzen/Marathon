import "../register/Register.css";
import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

const Register = () =>{
    const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


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
                                    type="text"
                                    placeholder="Login"
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