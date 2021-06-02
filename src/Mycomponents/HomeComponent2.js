import React from 'react'
import {Card , Button } from "react-bootstrap"
export default function Homecomponent2(props) {
    return (
        <div>
            <Card className="Components_cards">
              <Card.Header><p>Due Date :{props.list.due_date}</p></Card.Header>
              <Card.Body>
                <Card.Title>{props.list.Discription}</Card.Title>
                <Button id={props.list.Class_Id} onClick={() => props.function(props.list.Discription)} variant="primary">Show Status</Button>
              </Card.Body>
            </Card>
        </div>
    )
}
