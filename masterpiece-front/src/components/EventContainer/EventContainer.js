import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { Container } from '@material-ui/core';
import axios from 'axios';
import errorType from "../../error-type/errorType";
import getWithExpiry from "../../config/getWithExpiry";
import IsLogged from "../../config/IsLogged";
import { withRouter } from "react-router-dom";

let accessToken = getWithExpiry("access_token");

class EventContainer extends Component {

    state = {
        events: []
    }

    componentDidMount(){
        // let accessToken = localStorage.getItem('access_token');
        let userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=0&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber
            })
        })
        .catch(error => {
        let errMessage = errorType(error.response)
        console.log(errMessage)
        this.props.updateOpen([errMessage], "error")
        })
    }

    updateEventList = event =>{
        // let accessToken = localStorage.getItem('access_token');
        let userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=0&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber
            })
        })
        .catch(error => {
        let errMessage = errorType(error.response)
        console.log(errMessage)
        this.props.updateOpen([errMessage], "error")
        })
    }

    eventDelete = index =>{
        this.setState({events:[...this.state.events.slice(0, index), ...this.state.events.slice(index + 1)]})
    }

    nextPage = () =>{
        let totalPages = this.state.nbPages
        let currentPage = this.state.currentPage
        if(currentPage < totalPages-1){
            currentPage++
        }
        // let accessToken = localStorage.getItem('access_token');
        let userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=${currentPage}&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber
            })
        })
        .catch(error => {
        let errMessage = errorType(error.response)
        console.log(errMessage)
        this.props.updateOpen([errMessage], "error")
        })
    }

    previousPage = () =>{
        let currentPage = this.state.currentPage
        if (currentPage > 0) {
            currentPage--    
        }
        // let accessToken = localStorage.getItem('access_token');
        let userId = localStorage.getItem('user_id');
        axios.get(`http://localhost:8081/api/events/user/${userId}?p=${currentPage}&s=6`,{headers:{"Authorization": `Bearer ${accessToken}`}})
        .then(response => {
            console.log(response)
            this.setState({
                events: response.data.content,
                nbPages: response.data.totalPages,
                currentPage: response.data.pageable.pageNumber
            })
        })
        .catch(error => {
        let errMessage = errorType(error.response)
        console.log(errMessage)
        this.props.updateOpen([errMessage], "error")
        })
        
    }

    render() {
        const logged = IsLogged();
        if (!logged) {
            this.props.history.push("/connexion")
        }
        return (
            <Container component="main" maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
                <EventList events={this.state.events} eventDelete={this.eventDelete} nextPage={this.nextPage} previousPage={this.previousPage}/>
                <EventForm state={this.state.events} updateEventList={this.updateEventList} updateOpen={this.props.updateOpen}/>
            </Container>
        )
    }
}


export default withRouter(EventContainer);