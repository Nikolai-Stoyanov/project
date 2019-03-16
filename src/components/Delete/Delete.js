import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {  toast } from 'react-toastify';
import './Delete.css'


class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogFood: [],
    }
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/dogFood')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          dogFood: body.dogfood
        });
      });
  }

  delFood(e,foodId){
    e.preventDefault()
    fetch(`http://localhost:9999/feed/dogFood/delete/${foodId}`, {
      method: 'DELETE',
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
        return <Redirect to="/" />
      })
  }


  render() {

    if (this.state.dogFood.length === 0) {
      return (
        <span>Loading ...</span>
      )
    } else {
      const foodId = this.props.match.params.id;
      const food = this.state.dogFood.find(f => f._id === foodId)
      return (
        <div className="Delete">
          <h2>Delete {food.title}</h2>
          <div>
            <section className='first-section'>
              <img alt="pic" src={food.imageUrl} />
            </section>
            <section className='second-section'>
              <h1>Brand: {food.brand}</h1>
              <ul >
                <li><span>Description:</span> {food.description}</li>
                <li><span>Food Type:</span> {food.foodType}</li>
                <li><span>Life Stage:</span> {food.dogAge}</li>
                <li><span>Size:</span> {food.size} kg</li>
                <li><span>Price:</span> {food.price} lv</li>
              </ul>
            </section>
          </div>
          <ul className="butons">
            {
              this.props.isAdmin ?
                  <Link className="btn" onClick={(e) => this.delFood(e,foodId)} type='button' to='/'>Delete</Link>
                :
                null
            }
          </ul>
        </div>
      );
    }

  }
}
export default Delete;