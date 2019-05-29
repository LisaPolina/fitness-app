import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.min.css';
import Nav from './components/Nav';
import MealsPage from './meals/Page';
import UserPage from './user/Page';
import IndexPage from './index/Page';
import DayPage from './day/Page';
import AuthPage from './auth/Page';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from './api/User';

class App extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.isAuthorized = this.getIsAuthorized();
        this.state.user = null;
        this.getUserGlobal();
    }

    getUserGlobal() {
        if (this.getIsAuthorized()) {
            User.my()
                .then(user => {
                    this.setState({ user: user});
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            this.setState({user: null});
        }
    }

    getIsAuthorized() {
        return !!Cookies.get('sid');
    }

    authChangeHandler = () => {
        const isAuthorized = this.getIsAuthorized();
        this.setState({ isAuthorized });
        this.getUserGlobal();
    };


    logoutHandler = () => {
        User.logout()
            .then(res => {
               this.authChangeHandler();
            })
            .catch(err => {
                console.log(err)
            });
    };

    render() {
        return (
            <Router>
                <div>
                    <Nav isAuthorized={this.state.isAuthorized}
                         authChangeHandler={this.authChangeHandler}
                         logoutHandler={this.logoutHandler}
                         username={this.state.user ? this.state.user.username : null}/>
                    <Route
                        path="/meals/"
                        render={(props) => <MealsPage {...props} isAuthorized={this.state.isAuthorized} username={this.state.user ? this.state.user.username : null}/>} />

                    <Route
                        path="/profile/"
                        render={(props) => <UserPage {...props} isAuthorized={this.state.isAuthorized} user={this.state.user} authChangeHandler={this.authChangeHandler}/>}
                    />
                    <Route
                        path="/" exact
                        render={(props) => <IndexPage {...props} user={this.state.user}/>}
                    />
                    <Route
                        path="/index/:day" exact
                        render={(props) => <DayPage {...props}  user={this.state.user}/>}
                    />
                    <Route
                        path="/auth/"
                        render={(props) => <AuthPage {...props} isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />} />
                </div>
            </Router>
        );
    }
}

export default App;