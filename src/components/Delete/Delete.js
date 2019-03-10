import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
    console.log(foodId)
    fetch(`http://localhost:9999/feed/dogFood/delete/${foodId}`, {
      method: 'DELETE',
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


  render() {

    if (this.state.dogFood.length === 0) {
      return (

        <span>Loading ...</span>
      )
    } else {
      const foodId = this.props.match.params.id;
      const food = this.state.dogFood.find(f => f._id === foodId)
      return (
        <div className="Home">
          <span>
            <h1>{food.brand}</h1>
            <h2>Details of {food.title}</h2>
            <img alt="pic" src={food.imageUrl} />
            <p>{food.description}</p>
          </span>
          <ul className="details">
            <li>Food Type: {food.foodType}</li>
            <li>Life Stage: {food.dogAge}</li>
            <li>Size: {food.size} kg</li>
            <li>Price: {food.price} lv</li>
          </ul>
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