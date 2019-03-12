import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Details extends Component {
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


  render() {
    //const { dogFood } = this.state

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
            <p>Description: {food.description}</p>
          </span>
          <ul className="details">
            <li>Food Type: {food.foodType}</li>
            <li>Life Stage: {food.dogAge}</li>
            <li>Size: {food.size} kg</li>
            <li>Price: {food.price} lv</li>
          </ul>
          <ul className="butons">
            {
              this.props.username ?
                <Link className="btn" type='button' to={`/buy/${food._id}`}>Buy</Link>
                :
                null
            }
            {
              this.props.isAdmin ?
                (<div>
                  <Link className="btn" type='button' to={`/edit/${food._id}`}>Edit</Link>
                  <Link className="btn" type='button' to={`/delete/${food._id}`}>Delete</Link>
                </div>)
                :
                null
            }
          </ul>
        </div>
      );
    }

  }
}
export default Details;