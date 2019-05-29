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
            currentDayData: null
        };
    }

    getDay = (date) => {
        Days.findOne(date).then((day) => {
            this.setState({ 'currentDayData': day })
        });
    };


    componentDidMount() {
        if (this.props.user !== null) {
            this.getDay(this.state.day.format("YYYY-MM-DD"));
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if ((this.props.user !== prevProps.user || this.state.day.format("YYYY-MM-DD") !== prevState.day.format("YYYY-MM-DD")) && this.props.user !== null) {
            console.log("asd123");
            this.getDay(this.state.day.format("YYYY-MM-DD") );
        }
    }



    render() {
        let pageContent, content;
        console.log(this.state.currentDayData);
        if (this.props.user) {
           content = this.state.day.format("YYYY-MM-DD");
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