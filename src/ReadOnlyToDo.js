import React, { Component } from 'react';

class ReadOnlyToDo extends Component {
  constructor(props) {
    super(props);

    this.showEditableToDo = this.showEditableToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  showEditableToDo() {
    this.props.toggleEditMode(true);

  }

  deleteToDo() {
    // console.log('child deleteToDo');
    this.props.deleteToDo(this.props.todo.id)
  }

  render() {
    return (
        <tr>
            <td>{this.props.todo.name}</td>
            <td>{this.props.todo.dueDate}</td>
            <td>{this.props.todo.isDone ? 'yes' : 'no'}</td>
            <td>{this.props.todo.note || '--'}</td>
            <td>
              <button onClick={this.showEditableToDo}>edit</button>
              <button onClick={this.deleteToDo}>delete</button>
            </td>
        </tr>
    )
  }
}

export default ReadOnlyToDo;
