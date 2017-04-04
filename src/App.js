import React, { Component } from 'react';
import service from './service';
import Header from './Header';
import ToDos from './ToDos';
import NewToDo from './NewToDo';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }

        this.addNewToDo = this.addNewToDo.bind(this);
        this.deleteToDo = this.deleteToDo.bind(this);
    }

    componentDidMount() {
        service.getAllTodos()
            .then((response) => {
                const todos = response.data;
                this.setState({ todos });
                // console.log('todos', this.state.todos);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addNewToDo(todo) {
        // console.log('parent addNewToDo', todo);
        service.createToDo(todo)
            .then((response) => {
                const todos = response.data;
                this.setState({ todos });
                // console.log('addNewToDo response', response)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    deleteToDo(id) {
        // console.log('Apps deleteToDo', id);
        service.deleteToDo(id)
            .then((response) => {
                const todos = response.data;
                this.setState({ todos });
                // console.log('deleteToDo response', response);
            })
            .catch((error) => {
                console.error(error);
            });
    }
  
    render() {
        return (
        <div>
            <Header />
            <ToDos 
                todos={this.state.todos}
                deleteToDo={this.deleteToDo} />
            <NewToDo addNewToDo={this.addNewToDo} />
        </div>
        )
    }
}

export default App;