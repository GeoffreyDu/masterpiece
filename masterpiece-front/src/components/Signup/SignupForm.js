import React from "react";
import './signup.css'
import { withFormik } from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const form = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset
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
              <Card>
                <h1>Création de compte</h1>
                <CardContent>
                  <TextField
                    id="mail"
                    label="Mail"
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
                    label="Mot de passe"
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
                    label="Confirmation mot de passe"
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
            </form>
          </div>
        </Grid>
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
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Votre mot de passe doit contenir au minimum 8 caractères, dont au moins: une majuscule, une minuscule, un chiffre et un caractère spécial")
      .required("Entrez votre mot de passe"),
    confirmPassword: Yup.string()
    .required("Confirmez votre mot de passe")
    .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas")
  }),

  handleSubmit: (values, { resetForm }) => {
    delete values.confirmPassword
    const user = JSON.stringify(values);
    console.log(user);
    
    axios.post("http://localhost:8081/users", user, {headers:{"Content-Type":"application/json"}})
    .then(response => console.log(response))
    .catch(error => console.log(error))
    resetForm()
    
  }
})(form);

export default SignupForm;