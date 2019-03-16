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
      <div>
        <section className='home-first'>
          <h2>Best food for your best friend!</h2>
        </section>
        <section className="Home">
          <h1>What we offer</h1>
          <div className='all-products'>
            <ul className="products">
              {this.state.dogFood.map(food =>
                (<li key={food._id} className="product">
                  <section>
                    <h5>{food.title}</h5>
                    <img alt="pic" src={food.imageUrl} />
                  </section>
                  <div className="butons">
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
                  </div>
                </li>)
              )}
            </ul>
          </div>

        </section>
      </div>

    );
  }
}

export default Home;
