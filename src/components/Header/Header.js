import React, { Component, Fragment } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <header>
                <section className='header'>
                    <div className='header-right'>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/contact'>Contact</Link>
                        {
                            this.props.username ?
                                (<span>
                                    <Link to='/'>Welcome {this.props.username}!</Link>
                                    <Link to='/order'>My Orders</Link>
                                    {
                                        this.props.isAdmin ?
                                            (<Link to="/create">Create</Link>)
                                            :
                                            null
                                    }
                                    <Link to='/' onClick={this.props.logout}>Logout</Link>
                                </span>)
                                :
                                (<span>
                                    <Link to='/register'>Register</Link>
                                    <Link to='/login'>Login</Link>
                                </span>)
                        }
                    </div>
                </section>
                
            </header>
        );
    }
}

export default Header;