import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogFood: [],
      foodId: null,
      callmatchinfo: false,
    }
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickDetails = this.onClickDetails.bind(this);
  }


  onClickHandler(event) {
    const name = event.target.name;
    const foodId = event.target.id;

    let newState = {
      foodId
    };

    if (!(this.state.foodId === foodId && this.state[name])) {
      newState[name] = true;
    }
    this.setState(newState);
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

  // onClickDetails(id){
  //     console.log(id)
  //     return <Redirect to={`./details/${id}`} />;
  // }

  onClickDetails(id) {
    this.setState({
      callmatchinfo: true,
      id: id
    });
  }

  render() {
    // if (this.callmatchinfo) {
    //   return <Details dogFood={this.state.id} />
    // }
    return (
      <div className="Home">
        <h1>All foods</h1>
        <ul className="movies">
          {this.state.dogFood.map(food =>
            (<li key={food._id} className="movie">
              <h2>{food.title}</h2>
              <img src={food.imageUrl} />
              <ul className="butons">
                {/* <span><button name='details'  id={food._id} onClick={this.onClickDetails} >Details</button></span> */}
                <Link className="btn" to={`/details/${food._id}`}>Details</Link>
                {
                  this.props.username ?
                    // (<span><button name='buy' id={food._id} onClick={this.onClickHandler}>Buy</button></span>)
                    <Link className="btn" to={`/buy/${food._id}`}>Buy</Link>
                    :
                    null
                }
                {
                  this.props.isAdmin ?
                    // (<span><button name='edit' id={food._id} onClick={this.onClickHandler}>Edit</button></span>)
                    <Link className="btn" to={`/bedit/${food._id}`}>Edit</Link>
                    :
                    null
                }
              </ul>
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

export default Home;
