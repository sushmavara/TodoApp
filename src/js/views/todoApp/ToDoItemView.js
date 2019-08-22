import {todoContainerSelectors} from '../../domSelectors/todoAppContainerSelector'
import todoItemTemplate from '../../templates/todoElementTemplate'

function ToDoItemView(){
}

ToDoItemView.prototype.init = function(todoItemController) {
    todoContainerSelectors.toDoItemsUlList.addEventListener('click',todoItemController.onClickTodoItemWrapper.bind(todoItemController));
}

ToDoItemView.prototype.toggleEmptyContentMessage = function(todoListSize) {
    if(todoListSize){  
        todoContainerSelectors.emptyContent.style.display = "none";
        todoContainerSelectors.toDoListContainer.style.display = "block";
    }else {
        todoContainerSelectors.toDoListContainer.style.display = "none";
        todoContainerSelectors.emptyContent.style.display = "flex";
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

export default ToDoItemView;