import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import labels from "../../config/config";
import errorType from "../../error-type/errorType";
import getAccessToken from "../../config/getAccessToken";

const useStyles = makeStyles(theme => ({
  eventNameInput: {
      marginBottom: theme.spacing(4)
  },
  datePicker: {
      width: 200,
      marginBottom: theme.spacing(2)
  },
  fab: {
      position: 'fixed',
      bottom: theme.spacing(5),
      right: theme.spacing(5),
      textTransform: 'none'
  },
  extendedIcon: {
      marginRight: theme.spacing(1),
  }
}));

const AddEvent = props =>{

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    status,
    setFieldValue,
    setSubmitting
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setSubmitting(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
          <div>
            <Fab variant="extended" color="primary" onClick={handleClickOpen} className={classes.fab}>
              Créer un événement
            </Fab>
            <Dialog open={isSubmitting ? false : open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
              <DialogTitle id="form-dialog-title"><span style={{color:'black'}}>Création d'évenement</span></DialogTitle>
              <DialogContent>
                <DialogContentText>
                Complétez les détails de votre événement, en entrant un titre, une description et une date. Ensuite validez votre choix.
                </DialogContentText>
                  <form onSubmit={handleSubmit}>
                    <TextField
                        id="title"
                        label={labels.title}
                        className={classes.input}
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.title ? errors.title : ""}
                        error={touched.title && Boolean(errors.title)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                    />
                    <Grid container justify="space-between">
                    <TextField
                        id="description"
                        label={labels.description}
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.description ? errors.description : ""}
                        error={touched.description && Boolean(errors.description)}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="dateTime"
                        label={labels.datetime}
                        type="datetime-local"
                        value={values.dateTime}
                        onBlur={handleBlur}
                        onChange={e => setFieldValue("dateTime", e.target.value)}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        error={touched.dateTime && Boolean(errors.dateTime)}
                        helperText={touched.dateTime ? errors.dateTime : ""}
                        margin="dense"
                        variant="outlined"
                    />
                    </Grid>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Annuler
                      </Button>
                      <Button type="submit" color="primary" disabled={isSubmitting}>
                        Créer
                      </Button>
                    </DialogActions>    
                  </form>
              </DialogContent>
            </Dialog>
            {status ? <ErrorSnackbar messages={status.messages} severity={status.severity}/>: null}
          </div>   
        );
};

const EventForm = withFormik({
  mapPropsToValues: ({
    title,
    description,
    dateTime,
    userId
  }) => {
    return {
      title: title || "",
      description: description || "",
      dateTime: dateTime || new Date(new Date().setHours(new Date().getHours() + 3)).toISOString().substr(0, 16),
      userId: userId || localStorage.getItem('user_id'),
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup.string()
        .min(3, "Le tire requiert minimum 3 caractères")
        .max(18, "Le titre requiert maximum 18 caractères")
        .required("Un titre est requis"),
    description: Yup.string()
        .min(3, "La description requiert minimum 3 caractères")
        .max(30, "Le titre requiert maximum 30 caractères")
        .required("Une description est requise"),
    dateTime: Yup.date()
        .min(new Date(), "L'événement ne peut se produire dans le passé")
        .required("Une date est requise") 
  }),

  handleSubmit: (values, { resetForm, setSubmitting, props}) => {
    // Convert input to JSON
    const event = JSON.stringify(values);
    // Get access token from local storage
    const accessToken = getAccessToken("access_token");
    // API call to create an avent
    axios.post(`${process.env.REACT_APP_URL}/api/events`, event, {headers:{"Content-Type":"application/json", "Authorization": `Bearer ${accessToken}`}})
    .then(response => {
      // Show Notification
      props.updateOpen(["Evénement créé avec succès"], "success")
      // Update current event list page
      props.updateEventList(0)
    })
    .catch(error => {
      const errMessage = errorType(error.response)
      // If error show message in pop up notification
      props.updateOpen([errMessage], "error")
    })
    resetForm()
    setSubmitting(true)
  }
})(AddEvent);

export default EventForm;