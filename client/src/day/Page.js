import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {Link } from "react-router-dom";


class DayPage extends Component {
    state = {};

    constructor (props) {
        super(props);
        this.state = {
            day: moment(this.props.match.params.day)
        };
    }

    componentDidMount () {

    }


    render() {
        let pageContent, content;

        if (this.props.user) {
           content = this.props.match.params.day;
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