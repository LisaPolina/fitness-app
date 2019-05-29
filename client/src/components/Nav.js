import React, { Component } from 'react';
import {Link } from "react-router-dom";
import User from '../api/User';

class Nav extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authText = props.isAuthorized ? '' : 'Not authorized';
    }


    render() {
        let authButtons;

        if (this.props.isAuthorized) {
            authButtons = (<button onClick={this.props.logoutHandler} className="btn btn-outline-danger my-2 my-sm-0" id="delete-all-button">Log Out</button>)
        } else {
            authButtons = (<Link to="/auth/"><button className="btn btn-outline-success my-2 my-sm-0" id="delete-all-button">Log In</button></Link>)
        }

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Fitness Diary</Link>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav  mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/meals/">Meals</Link>
                        </li>
                    </ul>

                    {this.props.isAuthorized && <><ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile/">My profile</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">My diary</Link>
                            </li>
                        </ul>
                    </>}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link">{this.props.username !== null ? ('Authorized as: '+ this.props.username) : ''}</span>
                        </li>
                    </ul>
                    {authButtons}
                </div>
            </nav>
        );
    }
}

export default Nav;