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
// import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";
import labels from "../../config/config";

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

const UpdateEvent = props =>{

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    status,
    setFieldValue,
    closeUpdateForm,
    updateState,
  } = props;
  const classes = useStyles();

  return (
          <div>
            <Dialog open={updateState.open} onClose={closeUpdateForm} aria-labelledby="form-dialog-title" disableBackdropClick>
              <DialogTitle id="form-dialog-title"><span style={{color:'black'}}>Modification d'évenement</span></DialogTitle>
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
                      <Button onClick={closeUpdateForm} color="primary">
                        Annuler
                      </Button>
                      <Button type="submit" color="primary">
                        Modifier
                      </Button>
                    </DialogActions>    
                  </form>
              </DialogContent>
            </Dialog>
            {status ? <ErrorSnackbar messages={status.messages} severity={status.severity}/>: null}
          </div>   
        );
};

const UpdateForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      title: props.updateState.title || "",
      description: props.updateState.description || "",
      dateTime: props.updateState.date || ""
    };
  },

  validationSchema: Yup.object().shape({
    title: Yup.string()
        .min(3, "Le tire requiert minimum 3 caractères")
        .max(255)
        .required("Un titre est requis"),
    description: Yup.string()
        .min(3, "La description requiert minimum 3 caractères")
        .max(255)
        .required("Une description est requise"),
    dateTime: Yup.date()
        .min(new Date(), "L'événement ne peut se produire dans le passé")
        .required("Une date est requise") 
  }),

  handleSubmit:  (values, { resetForm, props}) => {
    const event = JSON.stringify(values);
    props.eventUpdate(event, props.updateState.id)
    resetForm()
    props.closeUpdateForm()
  }
})(UpdateEvent);

export default UpdateForm;