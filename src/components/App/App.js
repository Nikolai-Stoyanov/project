import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
//import { ToastContainer, toast } from 'react-toastify';
import './App.css';

import Home from '../Home/Home';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Create from '../Create/Create';
import Header from '../Header/Header';
import Details from '../Details/Details';
import About from '../About/About';
import Contact from '../Contact/Contact';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      isLoggedIn:false,
      dogFood:[]
    }
  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin')==='true'
    if (localStorage.getItem('username')) {
      this.setState({
        isLoggedIn:true,
        username: localStorage.getItem('username'),
        isAdmin: isAdmin
      })
    }
    fetch('http://localhost:9999/feed/dogFood')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          dogFood: body.dogFood
        });
        // toast.success(body.message, {
        //   closeButton: false
        // });
      });
  }

  handleChange(e) {
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
            isLoggedIn:true,
            username: responseBody.username,
            isAdmin: responseBody.isAdmin
          });
          localStorage.setItem('username', responseBody.username);
          localStorage.setItem('isAdmin', responseBody.isAdmin);
          // toast.success(`Welcome ${responseBody.username}`, {
          //   closeButton: false
          // })
        }
        else {
          // toast.error(responseBody.message, {
          //   closeButton: false
          // })
        }
      })
  }

  handleCreateSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:9999/feed/dogFood/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.errors) {
          // toast.success(responseBody.message, {
          //   closeButton: false
          // })
        }
        else {
          // toast.error(responseBody.message, {
          //   closeButton: false
          // })
        }
      })
  }

  handleLogout(event){
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    this.setState({
      username:null,
      isAdmin: false
    });
    // toast.success("Successfully logout!", {
    //   closeButton: false
    // });
  }

  render() {

    console.log(this.state.dogFoodId)
    return (
      <div className="App">
        {/* <ToastContainer /> */}
        <Router>
          <div>

            <Header isAdmin={this.state.isAdmin} username={this.state.username} logout={this.handleLogout}/>
            <Switch>
              <Route path='/' render={(props) => <Home {...props} isAdmin={this.state.isAdmin} username={this.state.username} dogFood={this.state.dogFood} />} exact />
              <Route path='/details/:id' render={(props) => <Details {...props} />}  />
              <Route path='/create' render={
                (props) => this.state.isAdmin ?
                  <Create {...props} handleCreateSubmit={this.handleCreateSubmit.bind(this)} handleChange={this.handleChange} />
                  :
                  <Redirect to={{ pathname: '/login' }} />
              } />
              <Route path='/register' render={(props) => <Register {...props} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} />
              <Route path='/login' render={() => <Login handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} />
              <Route path='/about' render={() => <About  />} />
              <Route path='/contact' render={() => <Contact  />} />
              <Route render={() => <h1>Not found!</h1>} />
            </Switch>
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
