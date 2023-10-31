import "./YourPlan.css";
import React from "react";

import Header from "../navbar/Header";
import { Carousel, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { useState, useEffect, useRef  } from "react";
import axios from "axios";
import Stats from "../stats/Stats";
import Footer from "../footer/Footer";

const YourPlan = () => {
    const [runDays, setRunDays] = useState();
    const [carouselActiveIndex, setCarouselActiveIndex] = useState(0); // Initialize with 0
    const containerRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/run/current-days')
          .then((res) => {
                //console.log(res.data)
                setRunDays(res.data)    
          })
          .catch(error => {
                console.error(error);
          });
    }, []);

    const changeCarouselItem = (date) => {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        axios.get('http://localhost:8080/api/run/' + formattedDate)
          .then((res) => {
                setRunDays(res.data);
                const indexToSet = runDays.findIndex(run => run.date === formattedDate);
                if (indexToSet !== -1) {
                    setCarouselActiveIndex(indexToSet);
                }
          })
          .catch(error => {
                console.error(error);
          });
        }
    const changeSlideOnCarousel = (day) => {
        let indexToSet = 0;
    
        if (day === "Tue") {
            indexToSet = 1;
        } else if (day === "Wed") {
            indexToSet = 2;
        } else if (day === "Thu") {
            indexToSet = 3;
        } else if (day === "Fri") {
            indexToSet = 4;
        } else if (day === "Sat") {
            indexToSet = 5;
        } else if (day === "Sun") {
            indexToSet = 6;
        }
        setCarouselActiveIndex(indexToSet);
    }

    return(
        <div>
            <div className="your-plan-container">
                <Header containerRef={containerRef}/>
                <div className="calendar-container">
                    <div className="calendar-panel">
                        <div>
                            <h2>Week: </h2>
                        </div>
                        <div className="calendar-buttons">
                            <Button onClick={() => changeSlideOnCarousel("Mon")} className="btn btn-dark">Mon</Button>
                            <Button onClick={() => changeSlideOnCarousel("Tue")} className="btn btn-dark">Tue</Button>
                            <Button onClick={() => changeSlideOnCarousel("Wed")} className="btn btn-dark">Wed</Button>
                            <Button onClick={() => changeSlideOnCarousel("Thu")} className="btn btn-dark">Thu</Button>
                            <Button onClick={() => changeSlideOnCarousel("Fri")} className="btn btn-dark">Fri</Button>
                            <Button onClick={() => changeSlideOnCarousel("Sat")} className="btn btn-dark">Sat</Button>
                            <Button onClick={() => changeSlideOnCarousel("Sun")} className="btn btn-dark">Sun</Button>
                        </div>
                        <div className="calendar-style">
                            <Calendar 
                                className="react-calendar-style"
                                onChange={(date) => changeCarouselItem(date)}
                            />
                        </div>
                    </div>
                    <Carousel 
                    fade data-bs-theme="dark"                                                                                        
                    className="carousel-style" 
                    activeIndex={carouselActiveIndex}
                    onSelect={(index) => setCarouselActiveIndex(index)}
                    >
                        {runDays?.map((run) => (
                            <Carousel.Item key={run.idRun} className="carousel-item-style">
                                <img
                                    className="d-block w-100 carousel-image-style"
                                    src={`images/marathon-${Math.floor(Math.random() * 3) + 1}.jpg`}
                                    alt="Slide"
                                />
                                <Carousel.Caption className="carousel-caption-style">
                                    <h5>{run.date}</h5>
                                    {run.name !== "Day Off" ? <div className="carousel-stats">
                                        <h6>{run.name}</h6>
                                        <p>Distance: {run.distance} km</p>
                                        <p>Time: {run.time} min</p>
                                        <p>Pace: {run.pace} km/h</p>
                                    </div> : <h6 style={{margin: "auto"}}>{run.name}</h6>}
                                </Carousel.Caption>
                                
                            </Carousel.Item>    
                        ))}    
                    </Carousel>
                    
                </div>
            </div>
            <Stats ref={containerRef} />
        </div>
    );
}

export default YourPlan;