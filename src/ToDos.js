import React, { Component } from 'react';
import ToDo from './ToDo';

class ToDos extends Component {
  constructor(props) {
    super(props);
    
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  deleteToDo(id) {
    // console.log('ToDos deleteToDo');
    this.props.deleteToDo(id);
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>To Do</td>
              <td>Due Date</td>
              <td>Done</td>
              <td>Note</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.props.todos.map((todo) => (
              <ToDo 
                key={todo.id} 
                todo={todo}
                deleteToDo={this.deleteToDo} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ToDos;
