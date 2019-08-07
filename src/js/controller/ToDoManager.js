import {ToDoItem} from  '../models/ToDoItem' 
import {elements,DomStrings} from '../views/DomElements'
import * as ToDoAction from '../views/ToDoItemUIView'
import {ACTION_BUTTONS} from '../constants'
import {deleteTodoModalTemplate, addTodoModalTemplate , updateTodoModalTemplate} from '../views/Todo-App-Templates'
import {initDataModalEventListners} from './eventListnerController'


let activeModal;

// converting array of objects into object of objects 
const getTodoItemsObjs = (itemList) => {
    return itemList.reduce(
        (accumulator,todoItem) => {
            accumulator[todoItem.id]=todoItem;
            return accumulator;
       },{});
}

// List of Todos
let todoItemsBucket = [];
todoItemsBucket = getTodoItemsObjs(todoItemsBucket);

// converting html to dom element 
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

// modal display based on event and adding event listners 
export const showDataModal = (event) => {
  let onClickBtn = event.target.id;
  switch (onClickBtn){
      case ACTION_BUTTONS.ADD_NEW_TODO:
        document.body.appendChild(htmlToElement(addTodoModalTemplate));
        break;
      case ACTION_BUTTONS.DELETE_SELECTED:
        document.body.appendChild(htmlToElement(deleteTodoModalTemplate));
        break;
      case ACTION_BUTTONS.EDIT_TODO:
        document.body.appendChild(htmlToElement(updateTodoModalTemplate.replace("%target-id%",event.targetTodoID)));
        break;
  }
  document.querySelector(DomStrings.modal).style.display="block";
  activeModal = document.querySelector(DomStrings.modal);
  initDataModalEventListners();
}  

function validateTitle(title){
    if(!title)
        activeModal.querySelector('.error-message').style.display="inline";
    return !title;
}

export const onClickAddNewTodo = () => {
    let itemInfo= ToDoAction.getTodoItemModalInfo();
    if(!validateTitle(itemInfo.title)){
        let newTodoItem = new ToDoItem(itemInfo.title,itemInfo.description,itemInfo.dueDate);
        todoItemsBucket[newTodoItem.id] = newTodoItem;
        ToDoAction.toggleEmptyContentMessage(Object.keys(todoItemsBucket).length);
        elements.toDoItemsList.appendChild(htmlToElement(newTodoItem.createTodoItemNode()));
        document.body.removeChild(activeModal);
    }
}

export const updateExistingUIListItem = (todoItem, updatedValues) => {
    let listItemToUpdate = elements.toDoItemsList.querySelector(`#todo-list-item-${todoItem.id}`);
    listItemToUpdate.querySelector('.title').textContent=updatedValues.title;
    listItemToUpdate.querySelector('.description').textContent=updatedValues.description;
    listItemToUpdate.querySelector('.due-date').textContent=updatedValues.dueDate;
}

export const onClickUpdateTodo = (event) => {
    let itemInfo= ToDoAction.getTodoItemModalInfo();
    let toDoIdToEdit = parseInt(activeModal.getAttribute("data-target"));
    if(!validateTitle(itemInfo.title))
    {
        updateExistingUIListItem(todoItemsBucket[toDoIdToEdit],itemInfo);
        todoItemsBucket[toDoIdToEdit] = todoItemsBucket[toDoIdToEdit].editTodoItem(itemInfo);
        document.body.removeChild(activeModal);
    }
    event.stopPropagation();
}

function modifyTodoItemList(uiItemsToModify,action) {
    for( let id in uiItemsToModify){
            let todoItemObj = todoItemsBucket[id];
            switch(action)
            {
                case ACTION_BUTTONS.DELETE_TODO:
                    ToDoAction.updateTodoItemsInUI(uiItemsToModify[id],action);
                    delete todoItemsBucket[todoItemObj.id];
                    ToDoAction.toggleEmptyContentMessage(Object.keys(todoItemsBucket).length);
                    break;
                case ACTION_BUTTONS.MARK_COMPLETE_TODO:
                    ToDoAction.updateTodoItemsInUI(uiItemsToModify[id],action);
                    todoItemObj.toggleMarkComplete();
                    break;  
                case ACTION_BUTTONS.MARK_COMPLETE_SELECTED:
                    ToDoAction.updateTodoItemsInUI(uiItemsToModify[id],action);
                    todoItemObj.markItemComplete();
            }
        }
    }

export const onClickDeleteSelectedTodo = () => {
    let itemsToDelete = ToDoAction.getCheckedItemsToModify();
    let action=ACTION_BUTTONS.DELETE_TODO;
    modifyTodoItemList(itemsToDelete,action); 
    document.body.removeChild(activeModal);
    event.stopPropagation();
}

export const onClickMarkCompleteSelectedTodo = () => {
    let itemsToUpdate = ToDoAction.getCheckedItemsToModify();
    let action=ACTION_BUTTONS.MARK_COMPLETE_SELECTED;
    modifyTodoItemList(itemsToUpdate,action);
    event.stopPropagation();
}

export const onClickTodoItem = (event) => {
    let itemID = ToDoAction.getItemId(event.target.parentNode);
    if(itemID){
        let action = event.target.id;
        let targetele = document.getElementById(DomStrings.toDoListItem.replace('%id%',itemID));
        switch(action)
        {
            case ACTION_BUTTONS.EDIT_TODO:
                event.targetTodoID = itemID;
                showDataModal(event);
                ToDoAction.fillEditTodoItemModal(todoItemsBucket[itemID]);
                break;
            case ACTION_BUTTONS.DELETE_TODO:
                modifyTodoItemList({[itemID]:targetele},action); 
                break;
            case ACTION_BUTTONS.MARK_COMPLETE_TODO:
                modifyTodoItemList({[itemID]:targetele},action); 
                break;
        } 
    }
    event.stopPropagation();
}