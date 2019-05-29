import React, { Component } from 'react';
import Meals from '../api/Meals';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class MealsPage extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.meals = [];
        this.state.editorForMealInd = null;
        this.state.message = null;
        this.state.create = false;
        this.editMealHandler = this.editMealHandler.bind(this);
        this.addMealHandler = this.addMealHandler.bind(this);
        this.hideFormForMealHandler = this.hideFormForMealHandler.bind(this);
        this.createFormMealHandler = this.createFormMealHandler.bind(this);
    }

    deleteAllMealsHandler = () => {
        Meals.deleteAll().then(() => {
            this.reloadMeals();
        })
    }

    deleteMealHandler = (id) => {
        Meals.delete(id).then(() => {
            this.reloadMeals();
        })
    }

    addMealHandler() {
        Meals.add(this.state.form).then((res) => {
            if (res._id) {
                this.setState({message: "Meal created successfully"});
                this.reloadMeals();
            } else {
                this.setState({message: "Couldn't create meal: " + res.message});
            }
        }).catch((err) => {
            this.setState({message: "Couldn't create meal: " + JSON.stringify(err)});
        });
    }

    editMealHandler () {
        Meals.edit(this.state.form._id, this.state.form).then((res) => {
            if (res._id) {
                this.setState({message: "Meal updated successfully"});
                this.reloadMeals();
            } else {
                this.setState({message: "Couldn't update meal: " + res.message});
            }
        }).catch((err) => {
            this.setState({message: "Couldn't update meal: " + JSON.stringify(err)});
        });
    }

    reloadMeals = () => {
        Meals.getAll().then((meals) => {
            this.setState({ 'meals': meals })
        });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.reloadMeals();
        }
    }

    showEditorForMealHandler(ind) {
        const cur = this.state.meals[ind];
        this.setState({
            editorForMealInd: ind,
            message: null,
            form: {
                _id: cur._id,
                name: cur.name,
                calories: cur.calories,
                description: cur.description
            }
        });
    }

    hideFormForMealHandler() {
        this.setState({editorForMealInd: null,
            create: false,
            message: null,
            form: {
                _id: null,
                name: null,
                calories: null,
                description: null
            }});
    }

    createFormMealHandler() {
        this.hideFormForMealHandler();
        this.setState({create: true});
    }



    inputChangeHandler = (event) => {
        let tempForm = _.clone(this.state.form);
        tempForm[event.target.name]=event.target.value;
        this.setState({ form: tempForm });
    }

    render() {
        let pageContent, content;

        if (this.state.editorForMealInd !== null || this.state.create) {
            content = <div key={"form"} className={"meals__once"}>
                    <input value={this.state.form._id} type={"hidden"} className="form-control" name={"_id"}/>
                    <div className="form-group">
                        <label>Name:</label>
                        <input value={this.state.form.name} className="form-control" name={"name"} onChange={this.inputChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Calories:</label>
                        <input value={this.state.form.calories} className="form-control" type={"number"} name={"calories"} onChange={this.inputChangeHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea value={this.state.form.description} className="form-control" type={"number"} name={"description"} rows="3" onChange={this.inputChangeHandler}/>
                    </div>
                    {this.state.editorForMealInd !== null && <button type="submit" className="btn btn-primary" onClick={this.editMealHandler}>Save</button>}
                    {this.state.create && <button type="submit" className="btn btn-primary" onClick={this.addMealHandler}>Create</button>}
                    <button type="button" className="btn btn-secondary ml-2" onClick={this.hideFormForMealHandler}>Close</button>
                    {this.state.message !== null && <div className="alert alert-warning mt-3" role="alert">
                        {this.state.message}
                    </div>}
                </div>;
        } else {
            const mealsList = this.state.meals.map((meal, ind) => {
                const actions = [
                    <span className={"meals__action-links"} key={"edit"} onClick={() => this.showEditorForMealHandler(ind)}>Edit</span>,
                    <span className={"meals__action-links"} key={"delete"} onClick={() => this.deleteMealHandler(meal._id)}>Delete</span>
                ];

                return <div key={meal._id} className={"meals__once"}>
                    <h5>{meal.name}</h5>
                    <p>Calories: {meal.calories}</p>
                    <p>{meal.description}</p>
                    {this.props.username === "root" && <p>Actions: {actions}</p>}
                </div>;
            });
            if (mealsList.length === 0) {
                mealsList.push(<div className="alert alert-warning mt-3" role="alert">
                    Unfortunately, it's empty.
                </div>);
            }

            content = (
                <div>
                    {this.props.username === "root" && <button type="submit" className="btn btn-primary meals__create-but" onClick={this.createFormMealHandler}>Create</button>}
                    {mealsList}
                </div>
            );
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

export default MealsPage;