import {elements} from './DomElements'

export const getTodoItemModalInfo = () => {
    // if(elements.toDoTitleInput.value==""){
    //     let errorEle= document.createElement('span');
    //     errorEle.setAttribute("class", "error-message");
    //     errorEle.textContent="Title can not be empty";
    //     elements.toDoTitleInput.parentElement.appendChild(errorEle);
    //     console.log(elements.toDoTitleInput);
    //     return false;
    // }
    return {
        title:elements.toDoTitleInput.value,
        description:elements.toDoDescriptionInput.value,
        due_date:elements.toDoDueDateInput.value
    }
}

export const clearFormData = () =>{
    elements.toDoTitleInput.value = "";
    elements.toDoDescriptionInput.value = "";
    elements.toDoDueDateInput.value = "";
}

export const toggleEmptyContentMessage = (listSize) => {
    if(listSize){  
        elements.toDoListContainer.style.display = "block";
        elements.emptyContent.style.display = "none";
    }else {
        elements.toDoListContainer.style.display = "none";
        elements.emptyContent.style.display = "flex";
        debugger;
        elements.deleteSelected.setAttribute('disabled',true);
    }
}
export const getItemId = (item) =>{
    let item_id = item.getAttribute('id');
    if(item_id)
    {
        item_id = item_id.split('-');
        return parseInt(item_id[item_id.length-1]);
    }
}
        

export const getCheckedItemsToModify = () => {
    let itemsToModify = [];
    let idsToModify = [];
    let listItems = Array.from(document.querySelectorAll('.item'));
    if(listItems.length > 0) {
        for (let item of listItems)
        {   
            if(item.querySelector('.item-select').checked)
            {
                idsToModify.push(getItemId(item));
                itemsToModify.push(item.parentElement);
            }
        }
    } 
    return [itemsToModify , idsToModify] ;
}

const deleteItem = (item) => {
    elements.toDoItemsList.removeChild(item);
}

const getToDoFields = (item) =>{
    return {
         titleField :item.querySelector('.title'),
         descriptionField : item.querySelector('.description'),
         dueDateField : item.querySelector('.due-date')
    }
}
const toggleMarkComplete = (item) => {
    let toDoFields = getToDoFields(item);
    toDoFields.titleField.classList.toggle('todo-complete');
    toDoFields.descriptionField.classList.toggle('todo-complete');
    toDoFields.dueDateField.classList.toggle('todo-complete');
}

const markCompleteSelected = (item) =>
{
    let toDoFields = getToDoFields(item);
    if(! toDoFields.titleField.getAttribute('class').includes('todo-complete'))
    {
       for ( let field in toDoFields)
       {
         toDoFields[field].classList.add('todo-complete');
       }
    }
}

export const updateTodoItems = (itemsToModify,action) =>{
    for ( let item of itemsToModify)
    {
        switch (action){
            case "delete":deleteItem(item);
                break;
            case "mark-complete": toggleMarkComplete(item);
                break;
            case "edit" : fillEditTodoItemModal(item);
                break;
            case "mark-complete-selected": markCompleteSelected(item);
                break;
        } 
    }
}

export const fillEditTodoItemModal = (data) =>{
    debugger;
    elements.toDoTitleInput.value=data.title;
}

