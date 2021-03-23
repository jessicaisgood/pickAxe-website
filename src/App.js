import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './views/Home';

export default class App extends React.Component {

  render(){
    return(
        <Router>
            <React.Suspense>
                <Switch>
                    <Route exact path="/home"  render={props => <Home {...props}/>} />
                    <Route exact path="/"  render={props => <Home {...props}/>} />
                </Switch>
            </React.Suspense>
        </Router>
    );
  }
}
