module.exports.getDateAWeekFromNow = 
    function() {
        var dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        return dueDate;
    }

module.exports.getFormattedDate = 
    function(date) {
        var month = date.getMonth() + 1;
        var formattedMonth = month < 10 ? '0' + month : month.toString();
        var day = date.getDate();
        var formattedDay = day < 10 ? '0' + day : day.toString();

        return `${date.getFullYear()}-${formattedMonth}-${formattedDay}`
    }

module.exports.getFormattedTodos = 
    function(todos) {  
        return todos.map((todo) => {
            return {
                id: todo.id,
                name: todo.todo_name,
                dueDate: this.getFormattedDate(new Date(todo.due_date)),
                isDone: todo.is_done,
                note: todo.note,
                isDeleted: todo.is_deleted
            }
        })
    }