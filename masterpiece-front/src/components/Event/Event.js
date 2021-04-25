import React from 'react';
import {Card, CardActions, CardContent, Typography, Button, makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      }
});

// Respresents an event with two methods to update or delete event
const Event = ({id, title, datetime, text, eventDelete, openUpdateForm}) => {
    const classes = useStyles()
    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography color="primary" variant="h5" component="h5">
                    {title}
                </Typography>
                <Typography color="textPrimary" variant="body2" component="p">
                    {`${datetime.substring(0, 10)} à ${datetime.substring(11, 16)}`}
                </Typography>
                <Typography color="textPrimary" variant="body2" component="p">
                    {text}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>openUpdateForm()}>
                    Modifier
                </Button>
                <Button size="small" color="secondary" onClick={(event, id)=>eventDelete(id)}>
                    Supprimer
                </Button>
            </CardActions>
        </Card>
    )
}

export default Event;