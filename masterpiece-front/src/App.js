import React, { Component } from 'react';
import Home from './components/Home/Home';
import ErrorSnackbars from './components/ErrorSnackbar/ErrorSnackbar'

class App extends Component {

  state = {
    open: true,
    messages: [],
    severity: ""
  }

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      this.setState({
        open: false
      })
    } 
  };

  updateOpen = (messages, severity) => {
    this.setState({
      open: true,
      messages: messages,
      severity: severity
    })
  }

  render(){
    return (
      <div>
        <Home/>
        <ErrorSnackbars open={this.state.open} handleClose={this.handleClose} updateOpen={this.updateOpen} messages={this.state.messages} severity={this.state.severity}/>
      </div>
    );
  }
  
}

export default App;
