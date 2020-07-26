import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { Container } from '@material-ui/core';
import axios from 'axios';
import errorType from "../../error-type/errorType";

class EventContainer extends Component {

    state = {
        events: []
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('access_token');
        let user = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/${user}?p=0&s=5`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: [{
                    "id": response.data.id,
                    "date": response.data.dateTime,
                    "title": response.data.title,
                    "description": response.data.description
                }]
            })
        })
        .catch(error => {
        let errMessage = errorType(error.response)
        console.log(error.response)
        })
    }

    updateEventList = (event)=>{
        this.setState({
            events: [...this.state.events, event]
        })
    }

    render() {

        return (
            <Container component="main" maxWidth="sm" style={{ minHeight: "calc(100vh - 150px)" }}>
                <EventList events={this.state.events}/>
                <EventForm state={this.state} updateEventList={this.updateEventList}/>
            </Container>
        )
    }
}


export default EventContainer;