import {todoItemTemplate} from '../views/Todo-App-Templates'
export default class ToDoItem {

    constructor(title,description,dueDate)
    {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.id = Date.now();
        this.isCompleted = false;
    }

    markItemComplete() {
        this.isCompleted = true;
    }

    toggleMarkComplete () {
        this.isCompleted = !this.isCompleted;
        return this;
    }

    editTodoItem (editedTodo) {
        this.title = editedTodo.title;
        this.description = editedTodo.description;
        this.dueDate = editedTodo.dueDate; 
        return this;    
    }

    createTodoItemNode()
    {
        return todoItemTemplate.replace("%id%",this.id).
        replace("%title%",this.title).
        replace("%description%",this.description).
        replace("%due-date%",this.dueDate);
    }
}
