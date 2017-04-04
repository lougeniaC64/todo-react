import React, { Component } from 'react';
const dataHelper = require('./../dataHelper');

class NewToDo extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            dueDate: '',//dataHelper.getFormattedDate(dataHelper.getDateAWeekFromNow()),
            isDone: false,
            note: ''
        }

        this.addNewToDo = this.addNewToDo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addNewToDo() {
        console.log('child addNewToDo', this.state);
        this.props.addNewToDo(this.state);
        this.setState({
            name: '',
            dueDate: '',//this.getFormattedDate(this.getDateAWeekFromNow()),
            isDone: false,
            note: ''
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <h4>Add To Do</h4>
                <div>
                    <div>
                        <label>name: </label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>due date: </label>
                        <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>note: </label>
                        <textarea name="note" value={this.state.note} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <button onClick={this.addNewToDo}>add To Do</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewToDo;
