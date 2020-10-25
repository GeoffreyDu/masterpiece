import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import UpdateForm from '../UpdateForm/UpdateForm';
import { Container } from '@material-ui/core';
import axios from 'axios';
import errorType from "../../error-type/errorType";
import getWithExpiry from "../../config/getWithExpiry";
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
        this.updateEventList(0);
    }

    updateEventList = (page) =>{
        const accessToken = getWithExpiry("access_token");
        const userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=${page}&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber,
                last: response.data.last
            })
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            console.log(errMessage)
            this.props.updateOpen([errMessage], "error")
        })
    }

    eventDelete = id =>{
        const accessToken = getWithExpiry("access_token");
        axios.delete(`http://localhost:8081/api/events/${id}`, {headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.props.updateOpen(["Evénement supprimé avec succès"], "success")
            this.updateEventList(0);
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            console.log(errMessage)
            this.props.updateOpen([errMessage], "error")
        })
    }

    eventUpdate = (event, id) =>{
        const accessToken = getWithExpiry("access_token");
        axios.put(`http://localhost:8081/api/events/${id}`, event, {headers:{"Content-Type":"application/json", "Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            this.props.updateOpen(["Evénement modifié avec succès"], "success")
            this.updateEventList(0);
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            console.log(errMessage)
            this.props.updateOpen([errMessage], "error")
        })
    }

    nextPage = () =>{
        let totalPages = this.state.nbPages
        let currentPage = this.state.currentPage
        if(currentPage < totalPages-1){
            currentPage++
        }
        this.updateEventList(currentPage)
    }

    previousPage = () =>{
        let currentPage = this.state.currentPage
        if (currentPage > 0) {
            currentPage--    
        }
        this.updateEventList(currentPage)
    }

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

    closeUpdateForm = () =>{
        this.setState({
            updateEvent: {
                open: false
            }
        })
    }

    fetchMoreData = (page) => {
        
        const accessToken = getWithExpiry("access_token");
        const userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=${page+1}&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: this.state.events.concat(response.data.content),
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber,
                last: response.data.last
              });
        })
        .catch(error => {
            const errMessage = errorType(error.response)
            console.log(errMessage)
            this.props.updateOpen([errMessage], "error")
        })
        
      };
    

    render() {
        const logged = IsLogged();
        if (!logged) {
            this.props.history.push("/connexion")
        }
        console.log(this.state)
        return (
            <Container component="main" maxWidth="md" style={{ minHeight: "100vh" }}>
                <EventList events={this.state.events} currentPage={this.state.currentPage} last={this.state.last} eventDelete={this.eventDelete} nextPage={this.nextPage} previousPage={this.previousPage} openUpdateForm={this.openUpdateForm} fetchMoreData={this.fetchMoreData}/>
                <EventForm updateEventList={this.updateEventList} updateOpen={this.props.updateOpen} currentPage={this.state.currentPage}/>
                <UpdateForm updateState={this.state.updateEvent} updateEventList={this.updateEventList} updateOpen={this.props.updateOpen} eventUpdate={this.eventUpdate} closeUpdateForm={this.closeUpdateForm} currentPage={this.state.currentPage}/>
            </Container>
        )
    }
}


export default withRouter(EventContainer);