import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import UpdateForm from '../UpdateForm/UpdateForm';
import { Container } from '@material-ui/core';
import axios from 'axios';
import errorType from "../../error-type/errorType";
import getAccessToken from "../../config/getAccessToken";
import IsLogged from "../../config/IsLogged";
import { withRouter } from "react-router-dom";

class EventContainer extends Component {
    state = {
        events: [],
        updateEvent: {
            open: false,
            id: "",
            title: "",
            date: "",
            description: ""
          },
        nbPages: 0,
        currentPage: 0,
        last: false
    }
    componentDidMount(){
        // When the component is loaded, load the first page of events
        this.updateEventList(0);
        this.loadUsername();
    }
    updateEventList = (page) =>{
        // get access token from local storage
        const accessToken = getAccessToken("access_token");
        // API call to get the list of events
        axios.get(`${process.env.REACT_APP_URL}/api/events/all?p=${page}&s=6`, {headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber,
                last: response.data.last
            })
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            // If error show message in pop up notification
            this.props.updateOpen([errMessage], "error")
        })
    }

    // Load the username in the welcome message
    loadUsername = () => {
        // get access token from local storage
        const accessToken = getAccessToken("access_token");
        // API call to get the username
        axios.get(`${process.env.REACT_APP_URL}/api/users/username`, {headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.setState({
                username: response.data.username
            })
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            // If error show message in pop up notification
            this.props.updateOpen([errMessage], "error")
        })
    }
    
    // Method to delete event
    eventDelete = id =>{
        // get access token from local storage
        const accessToken = getAccessToken("access_token");
        axios.delete(`${process.env.REACT_APP_URL}/api/events/${id}`, {headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.props.updateOpen(["Evénement supprimé avec succès"], "success")
            this.updateEventList(0);
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            this.props.updateOpen([errMessage], "error")
        })
    }

    // Method to update an event
    eventUpdate = (event, id) =>{
        const accessToken = getAccessToken("access_token");
        axios.put(`${process.env.REACT_APP_URL}/api/events/${id}`, event, {headers:{"Content-Type":"application/json", "Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.props.updateOpen(["Evénement modifié avec succès"], "success")
            this.updateEventList(0);
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            this.props.updateOpen([errMessage], "error")
        })
    }
    // Method to open update form
    openUpdateForm = (id, title, date, description) =>{
        this.setState({
            updateEvent: {
                open: true,
                id:id,
                title: title,
                date: date,
                description: description
            }
        })
    }

    // Method to close the update form
    closeUpdateForm = () =>{
        this.setState({
            updateEvent: {
                open: false
            }
        })
    }

    //Method to load data for scrol infinite
    fetchMoreData = (page) => {
        // get access token from local storage
        const accessToken = getAccessToken("access_token");
        // Load events and concat the following
        axios.get(`${process.env.REACT_APP_URL}/api/events/all?p=${page+1}&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.setState({
                events: this.state.events.concat(response.data.content),
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber,
                last: response.data.last
              });
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            this.props.updateOpen([errMessage], "error")
        })
        
      };
    
    // Redirection if user isn't logged
    render() {
        const logged = IsLogged();
        if (!logged) {
            this.props.history.push("/connexion")
            this.props.updateOpen(["Session expirée, veuillez vous reconnecter"], "error")
        }
        return (
            <Container component="main" maxWidth="md" style={{ minHeight: "100vh" }}>
                <EventList events={this.state.events} currentPage={this.state.currentPage} last={this.state.last} eventDelete={this.eventDelete} openUpdateForm={this.openUpdateForm} fetchMoreData={this.fetchMoreData} username={this.state.username}/>
                <EventForm updateEventList={this.updateEventList} updateOpen={this.props.updateOpen} currentPage={this.state.currentPage}/>
                <UpdateForm updateState={this.state.updateEvent} updateEventList={this.updateEventList} updateOpen={this.props.updateOpen} eventUpdate={this.eventUpdate} closeUpdateForm={this.closeUpdateForm} currentPage={this.state.currentPage}/>
            </Container>
        )
    }
}


export default withRouter(EventContainer);