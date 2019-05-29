import React, { Component } from 'react';
import User from '../api/User';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class UsersPage extends Component {
    state = {};

    constructor (props) {
        super(props);
        this.state = {
            message: null,
            form: this.retFormData(props.user)
        };
        this.editUserHandler = this.editUserHandler.bind(this);
        this.retFormData = this.retFormData.bind(this);
    }
    
    editUserHandler () {
        User.edit(this.state.form).then((res) => {
            if (res._id) {
                this.setState({message: "User updated successfully"});
                this.props.authChangeHandler();
            } else {
                console.log(res);
                this.setState({message: "Couldn't update user: " + res.message});
            }
        }).catch((err) => {
            this.setState({message: "Couldn't update user: " + JSON.stringify(err)});
        });
    };
    

    inputChangeHandler = (event) => {
        let tempForm = _.clone(this.state.form);
        tempForm[event.target.name]=event.target.value;
        this.setState({ form: tempForm });
    };

    retFormData (user) {
        if (user) {
            return {
                username: user.username,
                goal: user.goal,
                weight: user.weight,
                height: user.height
            };
        }
        return {
            username: null,
            goal: null,
            weight: null,
            height: null
        };
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.user, this.props.user)) {
            this.setState({
                form: this.retFormData(this.props.user)
            });
        }
    }

    render() {
        let pageContent, content;

        if (this.props.user) {
            content = <div key={"form"}>
                <div className="form-group">
                    <label>Username:</label>
                    <input value={this.state.form.username} className="form-control" name={"username"} disabled/>
                </div>
                <div className="form-group">
                    <label>Total number of calories per day:</label>
                    <input value={this.state.form.goal} className="form-control" type={"number"} name={"goal"} onChange={this.inputChangeHandler}/>
                </div>
                <div className="form-group">
                    <label>Your weight (kg):</label>
                    <input value={this.state.form.weight} className="form-control" type={"number"} name={"weight"} onChange={this.inputChangeHandler}/>
                </div>
                <div className="form-group">
                    <label>Your height (cm):</label>
                    <input value={this.state.form.height} className="form-control" type={"number"} name={"height"} onChange={this.inputChangeHandler}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.editUserHandler}>Save</button>
                {this.state.message !== null && <div className="alert alert-warning mt-3" role="alert">
                    {this.state.message}
                </div>}
            </div>;
        } else {
            content =  <div className="alert alert-warning mt-3" role="alert">
                It's empty.
            </div>;
        }

        
        pageContent = <div className="container">
                <div className="row">
                    <div className="col col-12">
                        {content}
                    </div>
                </div>
            </div>;

        return pageContent;
    }
}

export default UsersPage;