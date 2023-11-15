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
    const [firstDay, setFirstDay] = useState();
    const [lastDay, setLastDay] = useState();
    const [carouselActiveIndex, setCarouselActiveIndex] = useState(0); // Initialize with 0
    const containerRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/run/current-days/' + localStorage.getItem("email"))
          .then((res) => {
                //console.log(res.data)
                setRunDays(res.data)    
          })
          .catch(error => {
                console.error(error);
          });

          axios.get('http://localhost:8080/api/run/get-last-date/' + localStorage.getItem("email") )
          .then((res) => {
                setLastDay(res.data.date)    
          })
          .catch(error => {
                console.error(error);
          });

          axios.get('http://localhost:8080/api/run/get-first-date/' + localStorage.getItem("email") )
          .then((res) => {
                setFirstDay(res.data.date)    
          })
          .catch(error => {
                console.error(error);
          });
    }, []);

    const changeCarouselItem = (date) => {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        axios.get('http://localhost:8080/api/run/' + localStorage.getItem("email") + '/' + formattedDate)
          .then((res) => {
                setRunDays(res.data);
                const indexToSet = res.data.findIndex(run => run.date === formattedDate);
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

        if (day === "Wt") {
            indexToSet = 1;
        } else if (day === "Sr") {
            indexToSet = 2;
        } else if (day === "Cz") {
            indexToSet = 3;
        } else if (day === "Pi") {
            indexToSet = 4;
        } else if (day === "So") {
            indexToSet = 5;
        } else if (day === "Ni") {
            indexToSet = 6;
        }

        let slide = 0; //number of slide
        runDays.forEach(day => {
            const dayOfWeek = new Date(day.date).getDay();
            const adjustedDayOfWeek = (dayOfWeek + 6) % 7; // adjusting to Monday as 0
            if(adjustedDayOfWeek === indexToSet){
                setCarouselActiveIndex(slide);
            }
            slide++;
        });
    }

    return(
        <div>
            <div className="your-plan-container">
                <Header containerRef={containerRef}/>
                <div className="calendar-container">
                    <div className="calendar-panel">
                        <div>
                            <h2>Tydzień:</h2>
                        </div>
                        <div className="calendar-buttons">
                            <Button onClick={() => changeSlideOnCarousel("Po")} className="btn btn-dark">Po</Button>
                            <Button onClick={() => changeSlideOnCarousel("Wt")} className="btn btn-dark">Wt</Button>
                            <Button onClick={() => changeSlideOnCarousel("Sr")} className="btn btn-dark">Sr</Button>
                            <Button onClick={() => changeSlideOnCarousel("Cz")} className="btn btn-dark">Cz</Button>
                            <Button onClick={() => changeSlideOnCarousel("Pi")} className="btn btn-dark">Pi</Button>
                            <Button onClick={() => changeSlideOnCarousel("So")} className="btn btn-dark">So</Button>
                            <Button onClick={() => changeSlideOnCarousel("Ni")} className="btn btn-dark">Ni</Button>
                        </div>
                        <div className="calendar-style">
                            <Calendar 
                                className="react-calendar-style"
                                onChange={(date) => changeCarouselItem(date)}
                                minDate={new Date(firstDay)}
                                maxDate={new Date(lastDay)}
                            />
                        </div>
                    </div>
                    <Carousel 
                    fade 
                    interval={null}
                    data-bs-theme="dark"                                                                                        
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
                                    {(() => {
                                        if(run.name === "Długi bieg") {
                                            return <div className="carousel-stats">
                                                        <h6 className="run-name">{run.name}</h6>
                                                        <p>Dystans: {run.distance} km</p>
                                                        <p>Prędkość: {run.pace} min/km</p>
                                                    </div> 
                                        } else if(run.name === "Dzień wolny" ){
                                            return <h6 style={{margin: "auto"}} className="run-name">{run.name}</h6>
                                        } else if(run.name === "Marsz" ){
                                            return <div className="carousel-stats">
                                                        <h6 className="run-name">{run.name}</h6>
                                                        <p>Czas: {run.time}</p>
                                                    </div> 
                                        } else if(run.name === "Bieg/Marsz" ){
                                            return <div className="carousel-stats">
                                                        <h6 className="run-name">{run.name}</h6>
                                                        <p>Czas: {run.time}</p>
                                                        <p>Czas biegu: {run.walkTime}</p>
                                                        <p>Czas marszu: {run.runTime}</p>
                                                    </div> 
                                        }
                                    }
                                        )()} 
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