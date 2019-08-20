import {ToDoItem} from '../models/ToDoItem'
import {ToDoActionBarView} from '../views/todoApp/ToDoActionBarView'
import {MODALS_CLASS_NAME,MODAL_TEMPLATE,ACTION_BUTTON_CLASS_NAME} from '../constants'
import {TodoDataModalView} from '../views/todoApp/TodoDataModalView'
import {ToDoItemView} from '../views/todoApp/ToDoItemView'
import { elements } from '../views/domElements';

export function ToDoListManager(){
    this.toDoListItems = new Map();
    this.toDoListContainer = elements.toDoItemsUlList;
    this.toDoActionBarView= new ToDoActionBarView();
    this.toDoItemView = new ToDoItemView();
    this.todoDataModalView = new TodoDataModalView();
}

ToDoListManager.prototype.init = function() {
    this.toDoItemView.init(this);
    this.toDoActionBarView.init(this);
}

ToDoListManager.prototype.htmlToElement = function(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

ToDoListManager.prototype.showDataModal = function() {
    const modalAction = event.target.getAttribute("data-modal");
    const modalKeyName = Object.keys(MODALS_CLASS_NAME).find(key => MODALS_CLASS_NAME[key] === modalAction);
    const modalTemplate = MODAL_TEMPLATE[modalKeyName];
    this.todoDataModalView.attachDataModal(this.htmlToElement(modalTemplate));
    this.todoDataModalView.bindEvents(this);
  }

ToDoListManager.prototype.onClickSaveNewTodo = function(event){
    const toDoInfo = this.todoDataModalView.getTodoItemModalInfo();
    this.todoDataModalView.validateTitle(toDoInfo.title.trim());
    if(toDoInfo.title.trim()){
        const newTodo = new ToDoItem(toDoInfo);
        this.toDoListItems.set(newTodo.id,newTodo);
        this.todoDataModalView.destroyActiveDataModal();
      //  delete this.todoDataModalView;
        this.renderTodoList();
    }
    event.stopPropagation();
}

ToDoListManager.prototype.onClickUpdateTodo = function(event){
    const toDoInfo= this.todoDataModalView.getTodoItemModalInfo();
    this.todoDataModalView.validateTitle(toDoInfo.title.trim());
    if(toDoInfo.title.trim())
    {
        let todoToEdit=this.toDoListItems.get(this.activeTodoToEdit);
        todoToEdit.editTodoItem(toDoInfo);
        this.todoDataModalView.destroyActiveDataModal();
       // delete this.todoDataModalView;
        this.renderTodoList();
    }
    event.stopPropagation();
}

ToDoListManager.prototype.modifyTodoItemList = function(todoIdsToModify,action) {
    for( let toDoItemId of todoIdsToModify){
        const todoItemObj = this.toDoListItems.get(toDoItemId);
        switch(action)
        {
            case ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO:
                this.toDoListItems.delete(toDoItemId);
                break;
            case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_TODO:
                todoItemObj.toggleMarkComplete();
                break;  
            case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_SELECTED:
                todoItemObj.markTodoComplete();
                break;
            case ACTION_BUTTON_CLASS_NAME.MARK_TODO_CHECKED:
                todoItemObj.toggleMarkChecked();
        }
    }
    this.renderTodoList();
}

ToDoListManager.prototype.getIdsOfTodo = function(filterKey,filterValue){
    return Array.from(this.toDoListItems.entries()).reduce((result,current)=>{
        if(current[1][filterKey] === filterValue) result.push(current[0]);
        return result;
    },[]);
}

ToDoListManager.prototype.onClickDeleteSelectedTodo = function(){
    let itemsToDelete = this.getIdsOfTodo("isChecked",true);
    let action=ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO;
    this.modifyTodoItemList(itemsToDelete,action); 
    this.todoDataModalView.destroyActiveDataModal();
    event.stopPropagation();
}

ToDoListManager.prototype.onClickMarkCompleteSelectedTodo = function(){
    let itemsToUpdate = this.getIdsOfTodo("isChecked",true);
    let action=ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_SELECTED;
    this.modifyTodoItemList(itemsToUpdate,action);
    event.stopPropagation();
}

ToDoListManager.prototype.onClickTodoItemWrapper = function(event){
    const itemID = parseInt(event.target.parentNode.getAttribute('target-id'));
    if(itemID){
        const action = event.target.getAttribute('data-action');
        switch(action){
            case ACTION_BUTTON_CLASS_NAME.EDIT_TODO:
                this.activeTodoToEdit = itemID;
                this.showDataModal();
                this.todoDataModalView.fillUpdateTodoItemModal(this.toDoListItems.get(itemID));
                break;
            case ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO:
            case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_TODO:
            case ACTION_BUTTON_CLASS_NAME.MARK_TODO_CHECKED:
                this.modifyTodoItemList([itemID],action);     
        } 
    }
    event.stopPropagation();
}

ToDoListManager.prototype.renderTodoList = function(){
    if(!this.toDoListItems.size || this.toDoListItems.size === 1){
        this.toDoItemView.toggleEmptyContentMessage(this.toDoListItems.size);
    }

    this.toDoListContainer.innerHTML='';

    for(let todoItemId of this.toDoListItems.keys()){
        this.toDoItemView.renderTodo(this.toDoListItems.get(todoItemId),this.htmlToElement,this.toDoListContainer);
    }
}