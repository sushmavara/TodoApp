import {elements} from '../domElements'
import todoItemTemplate from '../../templates/todoElementTemplate'

export function ToDoListView(){
}

ToDoListView.prototype.init = (todoListManager) => {
    elements.toDoItemsUlList.addEventListener('click',todoListManager.onClickTodoItemWrapper.bind(todoListManager));
}

ToDoListView.prototype.toggleEmptyContentMessage = (todoListSize) => {
    if(todoListSize){  
        elements.emptyContent.style.display = "none";
        elements.toDoListContainer.style.display = "block";
    }else {
        elements.toDoListContainer.style.display = "none";
        elements.emptyContent.style.display = "flex";
    }
}

// ToDoListView.prototype.getCheckedTodosToModify = (todoListManager) => {
//     let todoItemsToModify = new Map();
//     let listItems = Array.from(document.querySelectorAll('.item'));
//     for (let item of listItems)
//     {   
//         if(item.querySelector('.itemSelect').checked){
//             todoItemsToModify.set(todoListManager.toDoItemView.getItemId(item),item)
//         }
//     }
//     return todoItemsToModify ;
// }

ToDoListView.prototype.renderTodo = function(todoItemObject,htmlToNodeFunction){
    let todoTemplate = todoItemTemplate.replace("%id%",todoItemObject.id).
        replace("%title%",todoItemObject.title).
        replace("%description%",todoItemObject.description).
        replace("%dueDate%",todoItemObject.dueDate);
    todoTemplate = todoItemObject.isCompleted ? todoTemplate.replace(/%isComplete%/g," todoComplete"):
            todoTemplate.replace(/%isComplete%/g,"");
    let toDoNode = htmlToNodeFunction(todoTemplate);
    if(todoItemObject.isChecked) toDoNode.querySelector('[data-action = "markTodoChecked"]').checked = true;
    elements.toDoItemsUlList.appendChild(toDoNode);
}