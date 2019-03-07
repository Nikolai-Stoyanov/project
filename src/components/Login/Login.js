import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { Drobdown } from 'react-dropdown';
import './Login.css';

class Login extends Component {

  constructor(props){
    super(props);
    this.state={
      username:null,
      password:null,
    }
    this.handleChange=props.handleChange.bind(this);
  }


  render() {

    if(this.isLoggedIn){
      return <Redirect to="/" />;
    }
    return (
      <div className="Login">
          <h1>Login</h1>
          <form onSubmit={(e)=> this.props.handleSubmit(e,this.state,'signin')}>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={this.handleChange} name="username" placeholder="Ivan Ivanov" />
            <label htmlFor="password">Password</label>
            <input type="password" onChange={this.handleChange} name="password" placeholder="******" />
            <input type="submit" value="Login" />
          </form>
      </div>
    );
  }
}

export default Login;
