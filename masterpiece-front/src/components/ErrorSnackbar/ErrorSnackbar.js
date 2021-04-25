import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// The component to display message (success or error) to inform the user
export default function ErrorSnackbars({ setUpdateOpen }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [severity, setSeverity] = React.useState("info");

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  setUpdateOpen((messages, severity) => {
    setMessages(messages)
    setSeverity(severity)
    setOpen(true)
  })
  
  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {messages.map((message, index)=>{
            return (<span key={index}>- {message}</span>);
          })}
        </Alert>
      </Snackbar>
    </div>
  );
}
