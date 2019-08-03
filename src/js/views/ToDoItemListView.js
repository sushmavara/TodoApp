import { elements } from "./DomElements";

// Truncate the string based on limit provided
export const cutString = (str , limit=30) => {
    if(str.length <= limit)
    {
        return str;
    }
    else {
        return str.slice(0,limit-2).concat("..");
    }
}

// Update text content of given element
export const updateElementContent = (ele, content) => {
    if(content === "")
    {
        ele.textContent = ".....";
    }
    else {
        ele.textContent = cutString(content);
    }
}

// Create to-do item 
let createElement = (todoItem) => {
    //create all empty elements 
    let listItem= document.createElement('li');
    let mainDiv = document.createElement('div');
    let checkBoxEle = document.createElement('input');
    let titleEle = document.createElement('div');
    let descriptionEle = document.createElement('div');
    let dueDateEle = document.createElement('div');
    let deleteIcon = document.createElement('i');
    let checkMarkIcon = document.createElement('i')
    let editIcon = document.createElement('i');

    // set attricutes of all the elements 
    mainDiv.setAttribute("class",'item');
    mainDiv.setAttribute('id',`todo-list-item-${todoItem.id}`);
    checkBoxEle.setAttribute("class","margin-left-20 item-select");
    checkBoxEle.setAttribute("type","checkbox");
    titleEle.setAttribute("class","title");
    descriptionEle.setAttribute("class","description");
    dueDateEle.setAttribute("class","due-date");
    deleteIcon.setAttribute('class','icon ion-md-trash delete-todo-item');
    checkMarkIcon.setAttribute('class','icon ion-md-checkmark todo-item-complete');
    editIcon.setAttribute('class','icon ion-md-create edit-todo-item');

    // add the text content
    updateElementContent(titleEle,todoItem.title);
    updateElementContent(descriptionEle,todoItem.description);
    updateElementContent(dueDateEle,todoItem.dueDate);

    // add title to the required node
    titleEle.setAttribute("title",todoItem.title);
    descriptionEle.setAttribute("title",cutString(todoItem.description,60));


    mainDiv.append(checkBoxEle,titleEle,descriptionEle,dueDateEle);
    mainDiv.append(editIcon,checkMarkIcon,deleteIcon);
    listItem.append(mainDiv);

    return listItem;
}

// Render the To-Do Element in UI
export const appendToDoItem = (todoItem) => {

    // create the list element from given object
    let todoItemEle = createElement(todoItem);

    //Display in UI
    elements.toDoItemsList.appendChild(todoItemEle);
}

