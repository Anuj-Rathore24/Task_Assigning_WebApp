import React from 'react'
import {Card , Button } from "react-bootstrap";
export default function HomeComponent1(props) {
  
    return (
        <div>
            <Card className="Components_cards">
              <Card.Header><p>Class ID :{props.list.Class_Id}</p></Card.Header>
              <Card.Body>
                <Card.Title>{props.list.Class_Name}</Card.Title>
                <Button id={props.list.Class_Id} onClick={() => props.function(props.list.Class_Id)} variant="primary">Show Assignments</Button>
              </Card.Body>
            </Card>
        </div>
    )
}
