import ToDoItem from '../models/ToDoItem'
import TodoActionBarController from '../controller/TodoActionBarController'
import ToDoDataModalController from '../controller/ToDoDataModalController'
import TodoItemController from '../controller/TodoItemController'
import {MODALS_CLASS_NAME} from '../constants/dataModalConstants'
import {MODAL_TEMPLATE} from '../constants/dataModalConstants'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'
import { todoContainerSelectors } from '../domSelectors/todoAppContainerSelector';

function ToDoManager(){
    this.toDoListItems = new Map();
    this.activeTodoToEdit = null;
    this.toDoListContainer = todoContainerSelectors.toDoItemsUlList;
    this.todoActionBarController = new TodoActionBarController();
    this.todoItemController = new TodoItemController();
    this.toDoDataModalController= new ToDoDataModalController();
}

ToDoManager.prototype.commitTodoListChanges = function() {
    window.localStorage.toDoListItems = JSON.stringify(Array.from(this.toDoListItems.entries()));
}


ToDoManager.prototype.init = function(todoListData) {
    this.setupTodoListData(todoListData);
    this.todoActionBarController.init(this);
    this.todoItemController.init(this);
    this.toDoDataModalController.init(this);
    this.renderTodoList();
}
ToDoManager.prototype.validateTodoFieldInfo= function (type,value){
    if(value === null) return null;
    switch(type){
        case "string":  value = value.toString();
                        break;
        case "number":  value= (isFinite(value) && isNumber(value))|| (!isNaN(parseInt(value)) && isNumber(parseInt(value))) ? value:null;
                        break;
        case "boolean": value = isNaN(Boolean(value)) ?  false : Boolean(value);
                        break;
    }
    return value;
}

ToDoManager.prototype.setupTodoListData = function(todoListData){
    let localStorageItems = window.localStorage.toDoListItems;
    if(localStorageItems){
        this.toDoListItems = new Map(JSON.parse(localStorageItems));
        return ;
    }
    try{
        let todoListArray = todoListData.todoListItems;
        if(!todoListArray) {
            console.warn("Parsing of Json object to todo list array failed");
            return;
        }
        todoListArray.forEach((current) => {
            let todoInfo = {
                id : this.validateTodoFieldInfo("string",current.id),
                title: this.validateTodoFieldInfo("string",current.title),
                description:  this.validateTodoFieldInfo("string",current.description),
                isChecked:  this.validateTodoFieldInfo("boolean",current.isChecked),
                isCompleted: this.validateTodoFieldInfo("boolean",current.isCompleted),
            }
            if( (todoInfo.id !== null && todoInfo.id.trim() !== "") && ((todoInfo.title !== null) && todoInfo.title.trim() !== "")) {
                this.toDoListItems.set(todoInfo.id,new ToDoItem(todoInfo));
            }
        });
    }catch (error){
        console.log(error);
    }
}

ToDoManager.prototype.setActiveTodoToEdit = function (activeTodoId) {
    this.activeTodoToEdit = activeTodoId;
}

ToDoManager.prototype.htmlToElement = function(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

ToDoManager.prototype.modifyTodoItemsOfList = function(todoIdsToModify,action) {
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


ToDoManager.prototype.addNewTodoItem = function(toDoInfo){
    const newTodo = new ToDoItem(toDoInfo);
    this.toDoListItems.set(newTodo.id,newTodo);
}

ToDoManager.prototype.updateTodoItem = function(toDoInfo){
    let todoToEdit = this.toDoListItems.get(this.activeTodoToEdit);
    todoToEdit.editTodoItem(toDoInfo);
}

ToDoManager.prototype.showAndFillDataModal = function(modalAction) {
    const modalKeyName = Object.keys(MODALS_CLASS_NAME).find(key => MODALS_CLASS_NAME[key] === modalAction);
    const modalTemplate = MODAL_TEMPLATE[modalKeyName];
    this.toDoDataModalController.displayModal(modalTemplate);
    if(this.activeTodoToEdit){
        this.toDoDataModalController.fillModal(this.toDoListItems.get(this.activeTodoToEdit));
    }
  }

ToDoManager.prototype.getIdsOfTodo = function(filterKey,filterValue){
    return Array.from(this.toDoListItems.entries()).reduce((result,current)=>{
        if(current[1][filterKey] === filterValue) result.push(current[0]);
        return result;
    },[]);
}

ToDoManager.prototype.renderTodoList = function(){
    this.todoItemController.toDoItemView.toggleEmptyContentMessage(this.toDoListItems.size);
    this.toDoListContainer.innerHTML='';

    for(let todoItemId of this.toDoListItems.keys()){
        this.todoItemController.toDoItemView.renderTodo(this.toDoListItems.get(todoItemId),this.htmlToElement,this.toDoListContainer);
    }
}

export default ToDoManager;