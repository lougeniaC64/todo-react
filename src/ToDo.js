import React, { Component } from 'react';
import ReadOnlyToDo from './ReadOnlyToDo';
import EditableToDo from './EditableToDo';
import service from './service';

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInEditMode: false,
      todo: this.props.todo
    }

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  toggleEditMode(isInEditMode) {
      this.setState({isInEditMode: isInEditMode})
  }

  updateToDo(todo) {
    service.updateToDo(todo)
      .then((response) => {
        // console.log('update response', response);
        this.setState({todo: response.data})
        this.toggleEditMode();
      })
      .catch((error) => {
        console.error('update error', error);
      });
  }

  deleteToDo(id) {
    // console.log('ToDo deleteToDo');
    /* should this bubble all the way up to Apps? Yep. Bye now. */
    this.props.deleteToDo(id);
  }
  
  render() {
    return (
      this.state.isInEditMode ? 
        <EditableToDo 
          todo={this.state.todo} 
          updateToDo={this.updateToDo} 
          toggleEditMode={this.toggleEditMode} /> : 
        <ReadOnlyToDo 
          todo={this.state.todo} 
          toggleEditMode={this.toggleEditMode}
          deleteToDo={this.deleteToDo} />  
    )
  }
}

export default ToDo;
