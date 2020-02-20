import React from "react";
import './signup.css'
import { withFormik} from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar"
import labels from "../../config/config"
import errorType from "../../error-type/errorType"

class Form extends React.Component{

  state = {
    open: false
  }

  render(){
    return (
      <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh'}}
        >
          <Grid item xs={11}>
            <div>
              <form onSubmit={this.props.handleSubmit}>
                <Card>
                  <h1>Création de compte</h1>
                  <CardContent>
                    <TextField
                      id="mail"
                      label={labels.email}
                      type="mail"
                      value={this.props.values.mail}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      helperText={this.props.touched.mail ? this.props.errors.mail : ""}
                      error={this.props.touched.mail && Boolean(this.props.errors.mail)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="password"
                      label={labels.password}
                      type="password"
                      value={this.props.values.password}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      helperText={this.props.touched.password ? this.props.errors.password : ""}
                      error={this.props.touched.password && Boolean(this.props.errors.password)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="confirmPassword"
                      label={labels.confirPassword}
                      type="password"
                      value={this.props.values.confirmPassword}
                      onChange={this.props.handleChange}
                      onBlur={this.props.handleBlur}
                      helperText={this.props.touched.confirmPassword ? this.props.errors.confirmPassword : ""}
                      error={this.props.touched.confirmPassword && Boolean(this.props.errors.confirmPassword)}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </CardContent>
                  <CardActions className="button">
                    <Button type="submit" color="primary" disabled={this.props.isSubmitting}>
                      Créer
                    </Button>
                    <Button color="secondary" onClick={this.props.handleReset}>
                      Réinitialiser
                    </Button>
                  </CardActions>
                </Card>
              </form>
            </div>
          </Grid>
          {this.props.status ? <ErrorSnackbar message={this.props.status}/>: null}
        </Grid>
    );
  }
};

const SignupForm = withFormik({
  mapPropsToValues: ({
    mail,
    password,
    confirmPassword
  }) => {
    return {
      mail: mail || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
    };
  },

  validationSchema: Yup.object().shape({
    mail: Yup.string()
      .email("Entrez un mail valide")
      .required("Le mail est requis"),
    password: Yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      <div>
      <p>Votre mot de passe doit contenir au minimum 8 caractères, dont au moins:</p>
        <ul>
          <li>une majuscule</li>
          <li>une minuscule</li>
          <li>un chiffre</li>
          <li>un caractère spécial</li>
        </ul>
      </div>)
      .required("Entrez votre mot de passe"),
    confirmPassword: Yup.string()
    .required("Confirmez votre mot de passe")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
  }),

  handleSubmit: (values, { resetForm, setStatus, set }) => {
    delete values.confirmPassword
    const user = JSON.stringify(values);
    
    axios.post("http://localhost:8081/users", user, {headers:{"Content-Type":"application/json"}})
    .then(response => console.log(response))
    .catch(error => {
      let errMessage = errorType(error.response)
      console.log(error.response)
      setStatus(errMessage)
      }
    )
    resetForm()
  }
})(Form);

export default SignupForm;