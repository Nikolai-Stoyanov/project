import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dogFood: []
            // creator:'',
            // date:'',
            // product:'',
            // quantity:'',
            // finalPrice:'',
        }
        this.handleChange=props.handleChange.bind(this);
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
        e.preventDefault()
        fetch(`http://localhost:9999/feed/order/order/create`, {
            method: 'POST',
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
        console.log(this.props)
        if (this.state.dogFood.length === 0) {
            return (
                <span>Loading ...</span>
            )
        } else {
            const foodId = this.props.match.params.id;
            const food = this.state.dogFood.find(f => f._id === foodId)
            const orderObj = {
                creator: this.props.username,
                date: '',
                product: food.title,
                quantity: '',
                finalPrice: food.price,
            }

            console.log(orderObj)
            return (
                <div className="Home">
                    <span>
                        <h1>{food.brand}</h1>
                        <h2>Buy of {food.title}</h2>
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
                            this.props.username ?
                                (<div>
                                    <select onChange={this.handleChange} name='quantity'>Quantity</select>
                                    <Link className="btn" onClick={(e) => this.createOrder(e, orderObj)} type='button' to='/'>Add to Order</Link>
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
export default Buy;