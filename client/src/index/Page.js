import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {Link } from "react-router-dom";



class IndexPage extends Component {
    state = {};

    constructor (props) {
        super(props);
        this.state = {
            message: null,
        };
    }


    render() {
        let pageContent, content;
        const curDay = moment(new Date());
        const monthStart = moment(new Date()).startOf('month');
        const monthEnd = moment(new Date()).endOf('month');

        if (this.props.user) {
            let days = [];
            let weekDays = [];
            let day = moment(monthStart);

            const startDate = moment(new Date()).startOf('month');
            for (let i = 0; i < 7; i++) {
                weekDays.push(
                    <li key={i}>
                        {moment(startDate).add(i, 'd').format('dddd')}
                    </li>
                );
            }
            while (day <= monthEnd) {
                days.push(<li key={day.format("DD")}><Link to={"/index/"+day.format("YYYY-MM-DD")}>{day.format("DD")}</Link></li>);
                day = moment(day).add(1, 'd');
            }

            content = <div>
                <div className="month">
                    <ul>
                        <li>{curDay.format('MMM')}<br/>
                            <span>{curDay.format('Y')}</span>
                        </li>
                    </ul>
                </div>
                <ul className="weekdays">
                    {weekDays}
                </ul>
                <ul className="days">
                    {days}
                </ul>
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

export default IndexPage;