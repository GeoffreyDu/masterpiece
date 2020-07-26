import React from "react";
import './signin.css'
import { withFormik } from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import labels from "../../config/config";
import { Link } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";
import qs from 'qs';
import errorType from "../../error-type/errorType";
import labelErrors from "../../config/labelErrors";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";

const cardStyle = {
  marginBottom: "15px"
}

const form = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit, 
    status
  } = props;

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
  >
        <Grid item xs={11}>
            <div>
                <form onSubmit={handleSubmit}>
                    <Card style={cardStyle}>
                        <h1>Connexion</h1>
                        <CardContent>
                            <TextField
                            id="mail"
                            label={labels.email}
                            type="mail"
                            value={values.mail}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.mail ? errors.mail : ""}
                            error={touched.mail && Boolean(errors.mail)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            />
                            <TextField
                            id="password"
                            label={labels.password}
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ""}
                            error={touched.password && Boolean(errors.password)}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            />
                        </CardContent>
                        <CardActions className="button">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                              Connexion
                            </Button>
                        </CardActions>
                    </Card>
                    <Link href='/inscription' variant="body2">Vous n'avez pas de compte? Inscription</Link>
                </form>
            </div>
        </Grid>
        {status ? <ErrorSnackbar messages={status.messages} severity={status.severity}/>: null}
    </Grid>
  );
};

const SigninForm = withFormik({
  mapPropsToValues: ({
    mail,
    password
  }) => {
    return {
      mail: mail || "",
      password: password || "",
    };
  },

  validationSchema: Yup.object().shape({
    mail: Yup.string()
      .email("Entrez un mail valide")
      .required("Le mail est requis"),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, labelErrors.ValidPassword
      )
      .required("Entrez votre mot de passe"),
  }),

  handleSubmit: (values, {props, resetForm, setStatus}) => {
    const { history } = props;
    console.log(values)
    var mail = values.mail;
    var password = values.password;
    var grantType = 'password';
    var clientId = 'masterpiece-client-id'
    var data = qs.stringify({
    'grant_type': 'password',
    'username': mail,
    'password': password,
    'client_id': 'masterpiece-client-id' 
    });
    var config = {
    method: 'post',
    url: `http://localhost:8081/oauth/token?grant_type=${grantType}&username=${mail}&password=${password}&client_id=${clientId}`,
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };
    axios(config)
    .then(function (response) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.userId);
      console.log(response.data);
      setStatus({
        messages: ["Connexion réussie"],
        severity: "success"
      });
      history.push("/evenements");
    })
    .catch(function (error) {
      let errMessage = errorType(error)
      console.log(error)
      setStatus({
        messages: errMessage,
        severity: "error"
      })
    });
  }
})(form);

export default withRouter(SigninForm);