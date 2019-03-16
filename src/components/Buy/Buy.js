import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Buy.css'


class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogFood: [],
            quantity: ''
        }
        this.handleChange = props.handleChange.bind(this);
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

    createOrder(e, data) {
        e.preventDefault();
        fetch(`http://localhost:9999/feed/order/create`, {
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
    }

    render() {
        if (this.state.dogFood.length === 0) {
            return (
                <span>Loading ...</span>
            )
        } else {
            const foodId = this.props.match.params.id;
            const food = this.state.dogFood.find(f => f._id === foodId)
            const quantities = this.state.quantity;
            const orderObj = {
                creator: this.props.userId,
                date: Date.now,
                product: food.title,
                quantity: quantities,
                price: food.price,
                finalPrice: food.price * quantities,
            }
            return (
                <div className="Buy">
                    <h2>To buy {food.title}</h2>
                    <div className='section'>
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
                    <div>
                        <ul >
                            {
                                this.props.username
                                    ?
                                    (<div>
                                        <input onChange={this.handleChange} type="number" name="quantity" id="quantity" step="1" />
                                        <Link className="btn" onClick={(e) => this.createOrder(e, orderObj)} type='button' to='/'>Add to Order</Link>
                                    </div>)
                                    :
                                    null
                            }
                        </ul>
                    </div>
                </div>
            );
        }

    }
}
export default Buy;