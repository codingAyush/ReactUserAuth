import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './shared/protected.route';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
