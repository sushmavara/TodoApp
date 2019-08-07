import {todoItemTemplate} from '../views/Todo-App-Templates'

export function ToDoItem(title,description,dueDate){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.id = Date.now();
    this.isCompleted = false;
}

ToDoItem.prototype.markItemComplete = function(){
    this.isCompleted = true;
    return this;
}

ToDoItem.prototype.toggleMarkComplete = function(){
    this.isCompleted = !this.isCompleted;
    return this;
}

ToDoItem.prototype.editTodoItem = function(editedTodo){
    this.title = editedTodo.title;
    this.description = editedTodo.description;
    this.dueDate = editedTodo.dueDate; 
    return this;  
}

ToDoItem.prototype.createTodoItemNode = function(){
    return todoItemTemplate.replace("%id%",this.id).
        replace("%title%",this.title).
        replace("%description%",this.description).
        replace("%due-date%",this.dueDate);
}