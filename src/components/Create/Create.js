import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  constructor(props){
    super(props);
    this.state={
      title:null,
      brand:null,
      imageUrl:null,
      foodType:null,
      dogAge:null,
      description:null,
      size:null,
      price:null
    }
    this.handleChange=props.handleChange.bind(this);
  }

  render() {
    return (
      <div className="Create">
        <h1>Create DogFood</h1>
        <form onSubmit={(e)=>this.props.handleCreateSubmit(e,this.state)}>
          <label htmlFor="title">Title</label>
          <input type="text" onChange={this.handleChange} name="title" />
          <label htmlFor="brand">Brand</label>
          <input type="text" onChange={this.handleChange} name="brand" />
          <label htmlFor="imageUrl">Picture</label>
          <input type="text" onChange={this.handleChange} name="imageUrl" />
          <label htmlFor="foodType">Food Type</label>
          <input type="text" onChange={this.handleChange} name="foodType" />
          <label htmlFor="dogAge">Life Stage</label>
          <input type="text" onChange={this.handleChange} name="dogAge" />
          <label htmlFor="description">Description</label>
          <textarea onChange={this.handleChange} name="description" />
          <label htmlFor="size">Size</label>
          <input type="text" onChange={this.handleChange} name="size" />
          <label htmlFor="price">Price</label>
          <input type="text" onChange={this.handleChange} name="price" />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default Create;
