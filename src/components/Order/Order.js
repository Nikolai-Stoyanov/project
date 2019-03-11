import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {  toast } from 'react-toastify';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    }
  }

  componentWillMount() {
    fetch('http://localhost:9999/order')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          order: body.order
        });
      });
  }

//   delFood(e,foodId){
//     e.preventDefault()
//     fetch(`http://localhost:9999/feed/dogFood/delete/${foodId}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' }
//     }).then(rawData => rawData.json())
//       .then(responseBody => {
//         if (!responseBody.errors) {
//           toast.success(responseBody.message, {
//             closeButton: false
//           })
//         }
//         else {
//           toast.error(responseBody.message, {
//             closeButton: false
//           })
          
//         }
//         return <Redirect to="/" />
//       })
//   }


  render() {

    if (this.state.order.length === 0) {
      return (
        <span>Loading ...</span>
      )
    } else {
        console.log(this.props.username)
      const foodId = this.props.match.params.id;
      const food = this.state.order.find(f => f._id === foodId)
      return (
        <div className="Home">
        {/* //   <span>
        //     <h1>{food.brand}</h1>
        //     <h2>Details of {food.title}</h2>
        //     <img alt="pic" src={food.imageUrl} />
        //     <p>{food.description}</p>
        //   </span>
        //   <ul className="details">
        //     <li>Food Type: {food.foodType}</li>
        //     <li>Life Stage: {food.dogAge}</li>
        //     <li>Size: {food.size} kg</li>
        //     <li>Price: {food.price} lv</li>
        //   </ul> */}
        <h1>Orders of {this.props.username}</h1>
            <table>
                <thead>
                    <tr>
                    <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Final Price</th>
                    </tr>
                </thead>
                
            {/* {this.state.order.map(food =>
            <tbody>
                    <tr>
                        <td>{{this.car.model}}</td>
                        <td>{{this.car.pricePerDay}} &euro;</td>
                        <td>In {{this.days}} days.</td>
                    </tr>
                </tbody>
            )} */}
            </table>
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
export default Order;