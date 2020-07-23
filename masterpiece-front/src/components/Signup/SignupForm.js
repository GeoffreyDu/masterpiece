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
import { Link } from "@material-ui/core";

const cardStyle = {
  marginBottom: "20px"
}

const signupForm = props =>{

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    status
  } = props;

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
            <form onSubmit={handleSubmit}>
              <Card style={cardStyle}>
                <h1>Création de compte</h1>
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
                  <TextField
                    id="confirmPassword"
                    label={labels.confirPassword}
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                  />
                </CardContent>
                <CardActions className="button">
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Créer
                  </Button>
                  <Button color="secondary" onClick={handleReset}>
                    Réinitialiser
                  </Button>
                </CardActions>
              </Card>
              <Link href='/connexion' variant="body2">Vous avez déjà un compte? Connexion</Link>     
            </form>
          </div>
        </Grid>
        {status ? <ErrorSnackbar message={status.message} severity={status.severity}/>: null}
      </Grid>
  );
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
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/, "Votre mot de passe doit contenir entre 8 et 20 caractères, dont au moins: une majuscule, une minuscule, un chiffre, un caractère spécial")
      .required("Entrez votre mot de passe"),
    confirmPassword: Yup.string()
    .required("Confirmez votre mot de passe")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
  }),

  handleSubmit: (values, { resetForm, setStatus, set }) => {
    delete values.confirmPassword
    const user = JSON.stringify(values);
    
    axios.post("http://localhost:8081/users", user, {headers:{"Content-Type":"application/json"}})
    .then(response => {
      console.log(response)
      setStatus({
        message: "Compte créé avec succès",
        severity: "success"
      })
    })
    .catch(error => {
      let errMessage = errorType(error.response)
      console.log(error.response)
      setStatus({
        message: errMessage,
        severity: "warning"
      })
      }
    )
    resetForm()
  }
})(signupForm);

export default SignupForm;