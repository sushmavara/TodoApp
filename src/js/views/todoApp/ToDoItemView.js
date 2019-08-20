import {elements} from '../domElements'
import todoItemTemplate from '../../templates/todoElementTemplate'

export function ToDoItemView(){
}

ToDoItemView.prototype.init = function(todoListManager) {
    elements.toDoItemsUlList.addEventListener('click',todoListManager.onClickTodoItemWrapper.bind(todoListManager));
}

ToDoItemView.prototype.toggleEmptyContentMessage = function(todoListSize) {
    if(todoListSize){  
        elements.emptyContent.style.display = "none";
        elements.toDoListContainer.style.display = "block";
    }else {
        elements.toDoListContainer.style.display = "none";
        elements.emptyContent.style.display = "flex";
    }
}

ToDoItemView.prototype.renderTodo = function(todoItemObject,htmlToNodeFunction,toDoListContainer){
    let todoTemplate = todoItemTemplate.replace("%id%",todoItemObject.id).
        replace("%title%",todoItemObject.title).
        replace("%description%",todoItemObject.description).
        replace("%dueDate%",todoItemObject.dueDate);
    todoTemplate = todoItemObject.isCompleted ? todoTemplate.replace(/%isComplete%/g," todoComplete"):
            todoTemplate.replace(/%isComplete%/g,"");
    let toDoNode = htmlToNodeFunction(todoTemplate);
    if(todoItemObject.isChecked) toDoNode.querySelector('[data-action = "markTodoChecked"]').checked = true;
    toDoListContainer.appendChild(toDoNode);
}