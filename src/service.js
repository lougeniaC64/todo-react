const axios = require('axios');

module.exports.getAllTodos = 
    function() {
        return axios.get('/todos')
    }

module.exports.updateToDo = 
    function(todo) {
        // console.log('axios updateToDo', todo);
        return axios.post('/todo', todo)
    }

module.exports.createToDo =
    function(todo) {
        // console.log('axios createToDo', todo);
        return axios.put('/todo', todo);
    }

module.exports.deleteToDo = 
    function(id) {
        // console.log('axios deleteToDo', id);
        return axios.delete(`/todo/${id}`);
    }