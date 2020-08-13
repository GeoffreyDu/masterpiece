import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import * as serviceWorker from './serviceWorker';
import SignupForm from './components/Signup/SignupForm';
import SigninForm from './components/Signin/SigninForm';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import EventContainer from './components/EventContainer/EventContainer';
import ErrorSnackbars from './components/ErrorSnackbar/ErrorSnackbar'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

class App extends Component{

  state = {
    open: false,
    messages: [],
    severity: "info"
  }

  handleClose = () => {
      this.setState({
        open: false
      })
  };

  updateOpen = (messages, severity) => {
    this.setState({
      open: true,
      messages: messages,
      severity: severity
    })
  }

  render(){
    return(
      <BrowserRouter forceRefresh={true}>
        <div className="App">
          <Navbar/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/inscription' component={() => <SignupForm updateOpen={this.updateOpen}/>}/>
              <Route exact path='/connexion' component={() => <SigninForm updateOpen={this.updateOpen}/>}/>
              <PrivateRoute exact path="/evenements" component={() => <EventContainer updateOpen={this.updateOpen}/>} />
            </Switch>
          <Footer/>
        </div>
        <ErrorSnackbars open={this.state.open} handleClose={this.handleClose} updateOpen={this.updateOpen} messages={this.state.messages} severity={this.state.severity}/>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
