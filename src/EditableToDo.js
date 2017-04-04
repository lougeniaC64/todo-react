import React, { Component } from 'react';
import dataHelper from './../dataHelper';

class EditableToDo extends Component {
    constructor(props) {
        super(props)

        var todo = this.props.todo;

        this.state = {
            id: todo.id,
            name: todo.name,
            dueDate: todo.dueDate,
            isDone: todo.isDone,
            note: todo.note
        }

        this.updateToDo = this.updateToDo.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateToDo() {
        // console.log('child updateToDo');
        this.props.updateToDo(this.state);
    }

    cancelChanges() {
        this.props.toggleEditMode(false);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <tr>
                <td>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                </td>
                <td>
                    <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleInputChange} />
                </td>
                <td>
                    <input type="checkbox" name="isDone" checked={this.state.isDone} onChange={this.handleInputChange} />
                </td>
                <td>
                    <textarea name="note" value={this.state.note} onChange={this.handleInputChange} />
                </td>
                <td>
                    <button onClick={this.updateToDo}>save</button>
                    <button onClick={this.cancelChanges}>cancel</button>
                </td>
            </tr>
        )
    }
}

export default EditableToDo;
