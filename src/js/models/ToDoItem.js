
export function ToDoItem(toDoItemInfo){
    this.title = toDoItemInfo.title;
    this.description = toDoItemInfo.description;
    this.dueDate = toDoItemInfo.dueDate;
    this.id = Date.now();
    this.isCompleted = false;
    this.isChecked = false;
}

ToDoItem.prototype.markTodoComplete = function(){
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

ToDoItem.prototype.toggleMarkChecked= function(){
    this.isChecked = !this.isChecked;
    return this;
}