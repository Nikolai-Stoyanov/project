import React, { Component } from 'react';
import { toast } from 'react-toastify';
import './Create.css';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      brand: null,
      imageUrl: null,
      foodType: null,
      dogAge: null,
      description: null,
      size: null,
      price: null
    }
    this.handleChange = props.handleChange.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
  }

  handleCreateSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:9999/feed/dogFood/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.errors) {
          toast.success(responseBody.message, {
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

  render() {
    return (
      <div className="Create">
        <h1>Create DogFood</h1>
        <form onSubmit={(e) => this.handleCreateSubmit(e, this.state)}>
          <label htmlFor="title">Title</label>
          <input type="text" onChange={this.handleChange} name="title" />
          <label htmlFor="brand">Brand</label>
          <input type="text" onChange={this.handleChange} name="brand" />
          <label htmlFor="imageUrl">Picture</label>
          <input type="text" onChange={this.handleChange} name="imageUrl" />
          <label htmlFor="foodType">Food Type</label>
          <select type="text" onChange={this.handleChange} name="foodType" defaultValue=''>
          <option selected value=""></option>
            <option value="Canned Food">Canned Food</option>
            <option value="Dry Food">Dry Food</option>
            <option value="Veterinary Diets">Veterinary Diets</option>
            <option value="Treats">Treats</option>
          </select>
          <label htmlFor="dogAge">Life Stage</label>
          <select type="text" onChange={this.handleChange} name="dogAge" defaultValue=''>
          <option selected value=""></option>
            <option value="Adult">Adult</option>
            <option value="Puppy">Puppy</option>
            <option value="Senior">Senior</option>
          </select>
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
