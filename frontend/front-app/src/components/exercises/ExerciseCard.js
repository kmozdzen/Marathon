import React from "react";

import Card from 'react-bootstrap/Card';

const ExerciseCard = (props) => {
    const variant = props.variant;
    
    return(
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          className="exercise-card-style mb-5"
        >
          <Card.Header>{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>
                {props.description}
            </Card.Text>
          </Card.Body>
        </Card>
    );
}

export default ExerciseCard;