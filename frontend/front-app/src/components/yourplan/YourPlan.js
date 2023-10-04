import "./YourPlan.css";
import React from "react";

import Header from "../navbar/Header";
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/esm/Button";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

const YourPlan = () => {
    const [runDays, setRunDays] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick1 = () =>{
        const defaultDays1 = [26, 27, 28];
        setRunDays(defaultDays1);
    }

    const handleOnClick2 = () =>{
        const defaultDays2 = [1, 2, 3];
        setRunDays(defaultDays2);
    }

    const handleOnClick3 = () =>{
        const defaultDays3 = [7, 8, 9];
        setRunDays(defaultDays3);
    }
    
    return(
        <div className="your-plan-container">
            <Header />
            <div className="calendar-container">
                <div className="a">
                    <Button onClick={handleOnClick1}>26-28</Button>
                    <Button onClick={handleOnClick2}>1-3</Button>
                    <Button onClick={handleOnClick3}>7-9</Button>
                    <div className="calendar-style">
                        <DatePicker label="Basic date picker" />
                    </div>
                </div>
                <Carousel fade data-bs-theme="dark" className="carousel-style">
                    <Carousel.Item className="carousel-item-style">
                        <img
                        className="d-block w-100 carousel-image-style"
                        src="images/marathon-1.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption className="carousel-caption-style">
                            <h5>{runDays[0]}</h5>
                            <div className="carousel-stats">
                                <h6>Run</h6>
                                <p>Distance: 10km</p>
                                <p>Time: 50min</p>
                                <p>Speed: 6km/h</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item-style">
                        <img
                        className="d-block w-100 carousel-image-style"
                        src="images/marathon-2.jpg"
                        alt="Second slide"
                        />
                        <Carousel.Caption className="carousel-caption-style">
                            <h5>{runDays[1]}</h5>
                            <div className="carousel-stats">
                                <h6>Run</h6>
                                <p>Distance: 14km</p>
                                <p>Time: 53min</p>
                                <p>Speed: 5km/h</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item-style">
                        <img
                        className="d-block w-100 carousel-image-style"
                        src="images/marathon-3.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption className="carousel-caption-style">
                            <h5>{runDays[2]}</h5>
                            <div className="carousel-stats">
                                <h6>Run</h6>
                                <p>Distance: 5km</p>
                                <p>Time: 40min</p>
                                <p>Speed: 3km/h</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
}

export default YourPlan;