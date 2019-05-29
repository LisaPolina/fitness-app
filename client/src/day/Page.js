import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Days from '../api/Days';
import {Link } from "react-router-dom";


class DayPage extends Component {
    state = {};

    constructor (props) {
        super(props);
        this.state = {
            day: moment(this.props.match.params.day),
            currentDayData: null,
            message: null,
            form: {
                date: moment(this.props.match.params.day).format("YYYY-MM-DD"),
                comment: null,
                total_calories: null
            }
        };
        this.editDayHandler = this.editDayHandler.bind(this);
        this.addDayHandler = this.addDayHandler.bind(this);
    }

    getDay = (date) => {
        Days.findOne(date).then((day) => {
                this.setState({ 'currentDayData': day, form: {
                    date: day.date,
                    comment: day.comment,
                    total_calories: day.total_calories
                }});
            })
            .catch(err => {

            });
    };


    componentDidMount() {
        if (this.props.user !== null) {
            this.getDay(this.state.day.format("YYYY-MM-DD"));
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if ((this.props.user !== prevProps.user || this.state.day.format("YYYY-MM-DD") !== prevState.day.format("YYYY-MM-DD")) && this.props.user !== null) {
            this.getDay(this.state.day.format("YYYY-MM-DD"));
        }
    }

    inputChangeHandler = (event) => {
        let tempForm = _.clone(this.state.form);
        tempForm[event.target.name]=event.target.value;
        this.setState({ form: tempForm });
    }

    addDayHandler() {
        Days.add(this.state.form).then((res) => {
            if (res._id) {
                this.setState({message: "Day created successfully"});
                this.getDay(this.state.day.format("YYYY-MM-DD"));
            } else {
                this.setState({message: "Couldn't create day: " + res.message});
            }
        }).catch((err) => {
            this.setState({message: "Couldn't create day: " + JSON.stringify(err)});
        });
    }

    editDayHandler () {
        Days.edit(this.state.form).then((res) => {
            if (res._id) {
                this.setState({message: "Day updated successfully"});
                this.getDay(this.state.day.format("YYYY-MM-DD"));
            } else {
                this.setState({message: "Couldn't update day: " + res.message});
            }
        }).catch((err) => {
            this.setState({message: "Couldn't update day: " + JSON.stringify(err)});
        });
    }


    render() {
        let pageContent, content;
        if (this.props.user) {
            content = <div key={"form"} className={"days__once"}>
                <p>Date: {this.state.day.format("YYYY-MM-DD")}</p>
                {this.props.user.goal && <p>Max number of calories per day:  {this.props.user.goal}</p>}
                <input value={this.state.form.date} type={"hidden"} className="form-control" name={"date"}/>
                <div className="form-group">
                    <label>Total number of calories:</label>
                    <input value={this.state.form.total_calories} className="form-control" name={"total_calories"} onChange={this.inputChangeHandler}/>
                </div>
                <div className="form-group">
                    <label>Comment:</label>
                    <textarea value={this.state.form.comment} className="form-control" type={"number"} name={"comment"} rows="3" onChange={this.inputChangeHandler}/>
                </div>
                {this.state.currentDayData !== null && <button type="submit" className="btn btn-primary" onClick={this.editDayHandler}>Save</button>}
                {this.state.currentDayData === null && <button type="submit" className="btn btn-primary" onClick={this.addDayHandler}>Create</button>}
                {this.state.message !== null && <div className="alert alert-warning mt-3" role="alert">
                    {this.state.message}
                </div>}
            </div>;
        } else {
            content =  <div className="alert alert-warning mt-3" role="alert">
                Need authorization for full functionality.
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

export default DayPage;