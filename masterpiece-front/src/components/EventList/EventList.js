import React from "react";
import { Grid, Container, makeStyles, Typography, Button } from '@material-ui/core';
import Event from "../Event/Event";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(12),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 0),
      },
    buttons:{
        display:"flex",
        justifyContent:"space-around",
        marginTop:"40px"
    }
  }));
  const EventList = (props) => {
    let username = localStorage.getItem('username');
    
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                    Mes événements
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Bienvenue <span style={{fontWeight:"bold", color:"black"}}>{username}</span>, ici vous pouvez gérer vos événements. Vous avez la possibilité de consulter la liste de vos événements, ainsi que d'en ajouter de nouveaux.
                    </Typography>
                </div>
            {props.events.length < 1 ? <h2 style={{marginLeft:"auto", marginRight:"auto", color:"black"}} className="text-center">Aucun événements</h2> : (
                <>
                    {props.events.map((event) => (
                    <Grid item key={event.id} xs={12} sm={6} md={4}>
                        <Event title={event.title} text={event.description} datetime={event.dateTime} id={event.id} eventDelete={(id)=>props.eventDelete(event.id)} openUpdateForm={(id)=>props.openUpdateForm(event.id)}/>
                    </Grid>
                    ))}
                </>
            )}
            </Grid>
            <div className={classes.buttons}>
                <Button variant="contained" size="small" color="primary" onClick={()=>props.previousPage()}>
                    <NavigateBeforeIcon/>
                </Button>
                <Button variant="contained" size="small" color="primary" onClick={()=>props.nextPage()}>
                    <NavigateNextIcon/>
                </Button>
            </div>
        </Container>
    ) 
}

export default EventList;