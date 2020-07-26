import React from "react";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button"
import { ListItemText } from '@material-ui/core';
import labels from "../../config/config";

const EventList = (props) => {
    
    
    return (
        <ListItem>
            {props.events.length > 0 ? (
                <>
                    {props.events.map((event, index) => (
                <ListItemText className="d-flex" key={index}>
                    <strong>{labels.title + `: ${event.title}`}</strong>
                    <div className="ml-auto">
                        {/* <Link className="btn btn-warning mr-1" to={`/edit/${event.id}`}>Edit</Link> */}
                        <strong>Description: {event.description}</strong>
                    <strong>Date: {event.date}</strong>
                        <Button color="primary">Modifier</Button>
                        <Button color="secondary">Effacer</Button>
                    </div>
                </ListItemText>
                    ))}
                </>
            ): <h4 className="text-center">Aucun événements</h4>}  
        </ListItem>
    ) 
}

export default EventList;