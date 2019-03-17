import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { handler } from 'react';
import './Edit.css';
// import { PassThrough } from 'stream';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // option:["Canned Food","Dry Food"],
      foodId: this.props.match.params.id,
      dogFood: [],
      title: "",
      brand: "",
      imageUrl: "",
      foodType: "",
      dogAge: "",
      description: "",
      size: "",
      price: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/dogFood')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          dogFood: body.dogfood
        });
        let food = this.state.dogFood.find(f => f._id === this.state.foodId)
        if (food) {
          this.setState({
            title: food.title,
            brand: food.brand,
            imageUrl: food.imageUrl,
            foodType: food.foodType,
            dogAge: food.dogAge,
            description: food.description,
            size: food.size,
            price: food.price
          })
        }
      });
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e, data, id) {
    e.preventDefault()
    fetch(`http://localhost:9999/feed/dogFood/edit/${id}`, {
      method: 'post',
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
    return <Redirect to="/" />;
  }

  render() {
    if (this.state.dogFood.length === 0) {
      return (

        <span>Loading ...</span>
      )
    } else {
      const data = {
        title: this.state.title,
        brand: this.state.brand,
        imageUrl: this.state.imageUrl,
        foodType: this.state.foodType,
        dogAge: this.state.dogAge,
        description: this.state.description,
        size: this.state.size,
        price: this.state.price
      }

      return (
        <div className="Edit  ">
          <h1>Edit {this.state.title}</h1>
          <form onSubmit={(e) => this.onSubmit(e, data, this.state.foodId)}>
            <label htmlFor="title">Title</label>
            <input type="text" onChange={this.onChange} name="title" value={this.state.title} />
            <label htmlFor="brand">Brand</label>
            <input type="text" onChange={this.onChange} name="brand" value={this.state.brand} />
            <label htmlFor="imageUrl">Picture</label>
            <input type="text" onChange={this.onChange} name="imageUrl" value={this.state.imageUrl} />
            <label htmlFor="foodType">Food Type</label>
            <select name="foodType" onClick={this.handleChange} value={this.state.value}>
              <option selected value='' >{this.state.foodType}</option>
              <option value="Canned Food" onClick={this.handleChange}>Canned Food</option>
              <option value="Dry Food" onClick={this.handleChange}>Dry Food</option>
              <option value="Veterinary Diets" onClick={this.handleChange}>Veterinary Diets</option>
              <option value="Treats" onClick={this.handleChange}>Treats</option>
            </select>
            <label htmlFor="dogAge">Life Stage</label>
            <select onChange={this.handleChange} name="dogAge" value={this.state.value} >
              <option selected value={this.state.dogAge}>{this.state.dogAge}</option>
              <option value="Adult" >Adult</option>
              <option value="Puppy" >Puppy</option>
              <option value="Senior">Senior</option>
            </select>
            <label htmlFor="description">Description</label>
            <textarea onChange={this.onChange} name="description" value={this.state.description} />
            <label htmlFor="size">Size</label>
            <input type="text" onChange={this.onChange} name="size" value={this.state.size} />
            <label htmlFor="price">Price</label>
            <input type="text" onChange={this.onChange} name="price" value={this.state.price} />
            <input type="submit" value="Edit" />
          </form>
        </div>
      );
    }
  }
}
export default Edit;