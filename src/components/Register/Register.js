import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Register.css';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      username:null,
      password:null,
      email:null,
    }
    this.handleChange=props.handleChange.bind(this);
  }
  render() {
    if(localStorage.username){
      return <Redirect to="/" />;
    }
    return (
      <div className="Register">
        <div className="Register">
          <h1>Register</h1>
          <form onSubmit={(e)=> this.props.handleSubmit(e,this.state,'signup')}>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={this.handleChange} name="username" placeholder="Ivan Ivanov" />
            <label htmlFor="email">Email</label>
            <input type="text" onChange={this.handleChange} name="email" placeholder="ivanov@gmail.com" />
            <label htmlFor="password">Password</label>
            <input type="password" onChange={this.handleChange} name="password" placeholder="******" />
            <input type="submit" value="REGISTER" />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
