import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <SignupForm/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
