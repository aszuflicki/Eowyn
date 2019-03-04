import React, { Fragment } from 'react'
import { Row, Col } from 'react-materialize'
import history from '../routers/history'

export default function NotificationNewPost(props) {
    return (
        <Row>
            <Col s={2}>
            <img src={`http://localhost:8081/profile/pic/${props.post.author}`} alt="" className="circle" style={{ width: "32px", height: "32px", position: "absolute", top: "15px" }} /> 
            </Col>
            <Col s={10}>
            New post in {props.discussion.topic}  
            {" "}by {props.post.author}
            <div onClick={() => history.push(`/discussion/${props.discussion.id}`)}> {">"} Link {"<"} </div>
            </Col>
        </Row>
    )
}
