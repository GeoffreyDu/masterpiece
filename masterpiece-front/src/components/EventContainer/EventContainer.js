import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { Container } from '@material-ui/core';

class EventContainer extends Component {

    render() {

        return (
            <Container component="main" maxWidth="sm" style={{ minHeight: "calc(100vh - 150px)" }}>
                <EventList />
                <EventForm />
            </Container>
        )
    }
}


export default EventContainer;