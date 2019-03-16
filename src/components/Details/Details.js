import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Details.css'


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
        <div className="Details">

          <h2>Details of {food.title}</h2>
          <div className='sections-Det'>
            <section className='first-section-Det'>
              <img alt="pic" src={food.imageUrl} />
            </section>
            <section className='second-section-Det'>
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
          <div>
            <section className="butons">
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
            </section>
          </div>
        </div>
      );
    }

  }
}
export default Details;