import {elements,DomStrings} from './DomElements'
import {ACTION_BUTTONS} from '../constants'

export const getTodoItemModalInfo = () => {
    return { 
        title:document.querySelector(DomStrings.toDoTitleInput).value,
        description:document.querySelector(DomStrings.toDoDescriptionInput).value,
        dueDate:document.querySelector(DomStrings.toDoDueDateInput).value
    }
}

export const toggleEmptyContentMessage = (listSize) => {
    if(listSize){  
        elements.emptyContent.style.display = "none";
        elements.toDoListContainer.style.display = "block";
    }else {
        elements.toDoListContainer.style.display = "none";
        elements.emptyContent.style.display = "flex";
    }
}

export const getItemId = (item) => {
    let item_id = item.getAttribute('id');
    if(item_id)
    {
        item_id = item_id.split('-');
        return parseInt(item_id[item_id.length-1]);
    }
}
        
export const getCheckedItemsToModify = () => {
    let itemsToModify = {};
    let listItems = Array.from(document.querySelectorAll('.item'));
    if(listItems.length > 0) {
        for (let item of listItems)
        {   
            if(item.querySelector('.item-select').checked)
            {
                itemsToModify[getItemId(item)] = item.parentElement;
            }
        }
    } 
    return itemsToModify ;
}

const deleteItem = (item) => {
    elements.toDoItemsList.removeChild(item);
}

const getToDoFields = (item) => {
    return {
         titleField :item.querySelector(DomStrings.todoTitle),
         descriptionField : item.querySelector(DomStrings.todoDescription),
         dueDateField : item.querySelector(DomStrings.todoDueDate)
    }
}
const markCompleteOnTodo = (item,isToggle) => {
    let toDoFields = getToDoFields(item);
    for ( let field in toDoFields){
        if(isToggle){
            toDoFields[field].classList.toggle('todo-complete');
        }
        else {
            toDoFields[field].classList.add('todo-complete');
        }
      }
}

export const fillEditTodoItemModal = (data) => {
    document.querySelector(DomStrings.toDoTitleInput).value = data.title;
    document.querySelector(DomStrings.toDoDescriptionInput).value = data.description;
    document.querySelector(DomStrings.toDoDueDateInput).value = data.dueDate;
}

export const updateTodoItemsInUI = (itemToModify,action) => {
     switch (action){
            case ACTION_BUTTONS.DELETE_TODO:
                deleteItem(itemToModify);
                break;
            case ACTION_BUTTONS.MARK_COMPLETE_TODO:
                markCompleteOnTodo(itemToModify,true);
                break;
            case ACTION_BUTTONS.MARK_COMPLETE_SELECTED:
                markCompleteOnTodo(itemToModify,false);
                break;
        } 
}