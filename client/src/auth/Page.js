import React, { Component } from 'react';
import User from '../api/User';

class AuthPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authLogin = '';
        this.state.authPassword = '';
        this.state.regLogin = '';
        this.state.regPassword = '';
    }

    authButtonClickHandler = () => {
        User.login(this.state.authLogin, this.state.authPassword)
            .then(res => {
                this.setState({
                    loginSuccessMessage: 'Authorization successful.',
                    loginErrorMessage: '',
                    authLogin: '',
                    authPassword: ''
                });
                this.props.authChangeHandler();
            })
            .catch(err => {
                this.setState({
                    loginSuccessMessage: '',
                    loginErrorMessage: 'Authorization error. Make sure you entered correct credentials.',
                    authLogin: '',
                    authPassword: ''
                });
            });
    }

    regButtonClickHandler = () => {
        User.register(this.state.regLogin, this.state.regPassword)
            .then(res => {
                this.setState({
                    regSuccessMessage: 'Registration successful.',
                    regErrorMessage: '',
                    regLogin: '',
                    regPassword: ''
                });
            })
            .catch(err => {
                this.setState({
                    regSuccessMessage: '',
                    regErrorMessage: 'Registration failed. Perhaps username is taken already.',
                    regLogin: '',
                    regPassword: ''
                });
            });
    }

    authLoginChangeHandler = (event) => {
        this.setState({ authLogin: event.target.value });
    }

    authPasswordChangeHandler = (event) => {
        this.setState({ authPassword: event.target.value });
    }

    regLoginChangeHandler = (event) => {
        this.setState({ regLogin: event.target.value });
    }

    regPasswordChangeHandler = (event) => {
        this.setState({ regPassword: event.target.value });
    }

    render() {
        let loginSuccess;
        let loginError;
        let regSuccess;
        let regError;

        if (this.state.loginSuccessMessage) {
            loginSuccess = (<div className="alert alert-success" role="alert">{this.state.loginSuccessMessage}</div>)
        }
        if (this.state.loginErrorMessage) {
            loginError = (<div className="alert alert-danger" role="alert">{this.state.loginErrorMessage}</div>)
        }
        if (this.state.regSuccessMessage) {
            regSuccess = (<div className="alert alert-success" role="alert">{this.state.regSuccessMessage}</div>)
        }
        if (this.state.regErrorMessage) {
            regError = (<div className="alert alert-danger" role="alert">{this.state.regErrorMessage}</div>)
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col col-6">
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col col-12">
                                        <h2>Authorization</h2><br />
                                        {loginSuccess}
                                        {loginError}
                                        <input onChange={this.authLoginChangeHandler} value={this.state.authLogin} className="form-control mr-sm-2" type="text" placeholder="Username" /><br />
                                        <input onChange={this.authPasswordChangeHandler} value={this.state.authPassword} className="form-control mr-sm-2" type="password" placeholder="Password" /><br />
                                        <button onClick={this.authButtonClickHandler} className="btn btn-outline-success">Log In</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-6">
                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col col-12">
                                        <h2>Registration</h2><br />
                                        {regSuccess}
                                        {regError}
                                        <input onChange={this.regLoginChangeHandler} value={this.state.regLogin} className="form-control mr-sm-2" type="text" placeholder="Username" /><br />
                                        <input onChange={this.regPasswordChangeHandler} value={this.state.regPassword} className="form-control mr-sm-2" type="password" placeholder="Password" /><br />
                                        <button onClick={this.regButtonClickHandler} className="btn btn-outline-success">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;