import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import * as serviceWorker from './serviceWorker';
import SignupForm from './components/Signup/SignupForm';
import SigninForm from './components/Signin/SigninForm';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

const Root = ()=>{
    return(
      <Router>
        <div className="App">
          <Navbar/>
            <Switch>
              <Route exact path='/' component={App}/>
              <Route exact path='/inscription' component={SignupForm}/>
              <Route exact path='/connexion' component={SigninForm}/>
            </Switch>
        </div>
      </Router>
    )
  }

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
