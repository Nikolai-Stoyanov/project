import React, { Component } from 'react';
import './Order.css'


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    }
  }

  componentWillMount() {
    fetch('http://localhost:9999/feed/order')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          orders: body.order
        });
      });
  }

  render() {

    if (this.state.orders.length === 0) {
      return (
        <span>Loading ...</span>
      )
    } else {
      const userId = this.props.userId;
      return (
        <div className="Order">
          <h1>Orders of {this.props.username}</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Final Price</th>
              </tr>
            </thead>

            {this.state.orders.map(order =>
              order.creator === userId ?
                (<tbody>
                  <tr>
                    <td className='dat'>{order.date}</td>
                    <td className='prod'>{order.product} </td>
                    <td>{order.price} lv</td>
                    <td>{order.quantity}</td>
                    <td>{order.finalPrice} lv</td>
                  </tr>
                </tbody>)
                :
                null
            )}
          </table>
        </div>
      );
    }

  }
}
export default Order;