import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Create from '../Create/Create';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';
import Delete from '../Delete/Delete';
import Buy from '../Buy/Buy';
import Order from '../Order/Order.js';
import About from '../About/About';
import Contact from '../Contact/Contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      username: null,
      isAdmin: false,
      isLoggedIn: false,
      dogFood: []
    }
  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (localStorage.getItem('username')) {
      this.setState({
        isLoggedIn: true,
        username: localStorage.getItem('username'),
        userId: localStorage.getItem('userId'),
        isAdmin: isAdmin
      })
    }
  }

  handleChange(e) {
    console.log(e)
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e, data, sign) {
    e.preventDefault();
    fetch(`http://localhost:9999/auth/${sign}`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.username) {
          this.setState({
            isLoggedIn: true,
            username: responseBody.username,
            userId: responseBody.userId,
            isAdmin: responseBody.isAdmin
          });
          localStorage.setItem('userId', responseBody.userId);
          localStorage.setItem('username', responseBody.username);
          localStorage.setItem('isAdmin', responseBody.isAdmin);
          toast.success(`Welcome ${responseBody.username}`, {
            closeButton: false
          })
        }
        else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }
      })
  }



  handleLogout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    toast.success("Successfully logout!", {
      closeButton: false
    });
    this.setState({
      userId: null,
      username: null,
      isAdmin: false,
      isLoggedIn: false,
    });

    
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Router>
          <div>
            <Header isAdmin={this.state.isAdmin} username={this.state.username} logout={this.handleLogout} />
            <Switch>
              <Route path='/' render={(props) => <Home {...props} isAdmin={this.state.isAdmin} username={this.state.username} dogFood={this.state.dogFood} />} exact />
              <Route path='/details/:id' render={(props) => <Details {...props} isAdmin={this.state.isAdmin} username={this.state.username} />} />
              
              <Route path='/order' render={
                (props) => this.state.username ? 
                <Order {...props} isAdmin={this.state.isAdmin} username={this.state.username} userId={this.state.userId} />
              :
              <Redirect to={{ pathname: '/login' }} />
              } />

              <Route path='/delete/:id' render={
                (props) => this.state.isAdmin ?
                 <Delete {...props} isAdmin={this.state.isAdmin} username={this.state.username} />
                :
                <Redirect to={{ pathname: '/login' }} />
                } />
              
              <Route path='/edit/:id' render={
                (props) => this.state.isAdmin ?
                  <Edit {...props} isAdmin={this.state.isAdmin} username={this.state.username} />
                  :
                  <Redirect to={{ pathname: '/login' }} />
              } />

              <Route path='/buy/:id' render={
                (props) => this.state.username ?
                  <Buy {...props} handleChange={this.handleChange} isAdmin={this.state.isAdmin} username={this.state.username} userId={this.state.userId} />
                  :
                  <Redirect to={{ pathname: '/login' }} />
              } exact />

              <Route path='/create' render={
                (props) => this.state.isAdmin ?
                  <Create {...props} handleChange={this.handleChange} />
                  :
                  <Redirect to={{ pathname: '/login' }} />
              } />

              <Route path='/register' render={(props) => <Register {...props} isLoggedIn={this.state.isLoggedIn} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} />
              <Route path='/login' render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} />
              <Route path='/about' render={() => <About />} />
              <Route path='/contact' render={() => <Contact />} />
              <Route render={() => <h1>Not found!</h1>} />
            </Switch>
            <Footer />
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
