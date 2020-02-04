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

const form = props => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
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
                    <Card>
                        <h1>Connexion</h1>
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
                        </CardContent>
                        <CardActions className="button">
                            <Button type="submit" color="primary" disabled={isSubmitting}>
                            Connexion
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </div>
        </Grid>
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
  }),

  handleSubmit: (values, { resetForm }) => {
    delete values.confirmPassword
    const user = JSON.stringify(values);
    console.log(user);
    resetForm()
    alert(values)
    
  }
})(form);

export default SigninForm;