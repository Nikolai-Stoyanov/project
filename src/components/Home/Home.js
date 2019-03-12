import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogFood: [],
      foodId: null,
    }
    this.onClickHandler = this.onClickHandler.bind(this);
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
        toast.success(body.message, {
          closeButton: false
        });
      });

  }


  render() {
    return (
      <div className="Home">
        <img alt="pic" className="homePic" src={"https://www.naturalinstinct.com/media/wysiwyg/natural_instinct/blog/20170623-HEADER-Obesity.png"} />
        <h1>All foods</h1>
        <ul className="movies">
          {this.state.dogFood.map(food =>
            (<li key={food._id} className="movie">
              <h2>{food.title}</h2>
              <img alt="pic" src={food.imageUrl} />
              <ul className="butons">
                <Link className="btn" type='button' to={`/details/${food._id}`}>Details</Link>
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
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

export default Home;
