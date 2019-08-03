import ToDoItem from './models/ToDoItem'
import {elements} from './views/DomElements'
import * as ToDoAction from './views/ToDoItemActionView'
import {initializeModal} from './controller/ModalController'
import {appendToDoItem} from './views/ToDoItemListView'

/***** State of Todo Items ******/ 

// List of Todos
const todoItemsBucket = {};

// List of Todo Actions
const todoActions = {
    delete: "delete",
    edit: "edit",
    markComplete : "mark-complete",
    markCompleteSelected : "mark-complete-selected",
} 

/*** Control the app content to be displayed ***/
function showContent(evt, id) {
    var i, menuItems, navLinks;
    menuItems = elements.menuItems;
    for (i = 0; i < menuItems.length; i++) {
        menuItems[i].style.display = "none";
    }
    navLinks = elements.navLinks;
    for (i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.classList.add('active');
  }

elements.todoAppNavBar.addEventListener('click',function(event){
    showContent(event,'to-do-app');
});
elements.calendarAppNavBar.addEventListener('click',function(event){
    showContent(event,'calendar-app');
});
 

/*** Initialize Modal Controller ****/
window.addEventListener('load', function() {
    initializeModal('add-item-modal', 'add-new-todo');
    initializeModal('delete-confirmation-modal', 'delete');
  });


// Modify the todoitemlist bucket to maintain the state of the app
function updateTodoItemBucket(action,idsToModify) {
    for(let id of idsToModify)
    {
        let todoItemObj = todoItemsBucket[id];
        if(todoItemObj)
        {
            switch(action)
            {
                case todoActions.delete:
                        delete todoItemsBucket[todoItemObj.id];
                    break;
                case todoActions.markComplete:
                    //todoItem.isCompleted=true;
                    break; // Fix this 
                case todoActions.edit:
                    // add this 
            }           
        }
    }
}

/*** ToDo Actions Controller ****/

// Add new Todo
elements.saveTodoItem.addEventListener('click',()=>{
    debugger;
    let itemInfo= ToDoAction.getTodoItemModalInfo();

    let newTodoItem= new ToDoItem(itemInfo.title,itemInfo.description,itemInfo.due_date);
    todoItemsBucket[newTodoItem.id] = newTodoItem;

    // remove empty content and display the list container 
    ToDoAction.toggleEmptyContentMessage(Object.keys(todoItemsBucket).length);
    elements.addTodoItemModal.classList.toggle("show-modal");
  
    // render the todo item in ui
    appendToDoItem(newTodoItem);
    ToDoAction.clearFormData();
});


// delete selected todo items
elements.deleteConfirmationModal.querySelector('.delete-todo').addEventListener('click',(event) => {
    debugger;
    let [itemsToDelete, idsToDelete] = ToDoAction.getCheckedItemsToModify();
    let action=todoActions.delete;
    modifyTodoItems(itemsToDelete,idsToDelete,action); 
    elements.deleteConfirmationModal.classList.toggle("show-modal"); 
});

// mark as complete on  selected todo items
elements.markCompleteOnSelectedItems.addEventListener('click',(event) => {
    debugger;
    let [itemsToUpdate, idsToUpdate] = ToDoAction.getCheckedItemsToModify();
    let action=todoActions.markCompleteSelected;
    modifyTodoItems(itemsToUpdate,idsToUpdate,action);
});

// const isTodoAlreadyPresent = (item) =>
// {
//     let items = Array.from(todoItemsBucket.values());
//     return items.map((cur) => cur.id==item.id)[0];
// }

// Modify the Todo items based on the action provided
function modifyTodoItems(items,ids,action){
    debugger;
    if(items.length > 0)
    {
        switch(action)
        {
            case todoActions.delete:
                ToDoAction.updateTodoItems(items,action);
                updateTodoItemBucket(action,ids);
                ToDoAction.toggleEmptyContentMessage(Object.keys(todoItemsBucket).length);
                break;
            case todoActions.markComplete:
                ToDoAction.updateTodoItems(items,action);
                updateTodoItemBucket(action,ids);
                break;  
            case todoActions.edit:
                //let todoItemData = todoItemsBucket.get(ids);
                if(todoItemData)
                {
                    elements.addTodoItemModal.classList.toggle("show-modal"); 
                    ToDoAction.updateTodoItems(todoItemData,action);
                }
                break;
            case todoActions.markCompleteSelected:
                ToDoAction.updateTodoItems(items,action);
        }
    }  
}

// update/delete/mark-as-complete on individual todo item 
elements.toDoListContainer.addEventListener('click',(event) => {
    debugger;
    let ele = event.target.parentNode;
    let id = [ToDoAction.getItemId(ele)];

    let action = event.target.getAttribute("class");
    let targetele = [event.target.parentNode.parentNode];
    if(action.includes("edit-todo-item")){
        modifyTodoItems(targetele,id,todoActions.edit);
    }
    else if (action.includes("delete-todo-item"))
    {
        modifyTodoItems(targetele,id,todoActions.delete); 
    }
    else if (action.includes("todo-item-complete"))
    {
        modifyTodoItems(targetele,id,todoActions.markComplete); 
    }
     
});









