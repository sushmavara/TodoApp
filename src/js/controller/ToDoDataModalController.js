import TodoDataModalView from '../views/todoApp/TodoDataModalView'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'

function ToDoDataModalController(){
    this.todoDataModalView = new TodoDataModalView();
}

ToDoDataModalController.prototype.init = function(todoManager) {
   this.todoManager = todoManager;
}

ToDoDataModalController.prototype.displayModal= function(modalTemplate) {
    this.todoDataModalView.attachDataModal(this.todoManager.htmlToElement(modalTemplate));
    this.todoDataModalView.bindEvents(this);
}

ToDoDataModalController.prototype.fillModal= function(todoInfo) {
    this.todoDataModalView.fillUpdateTodoItemModal(todoInfo);
}

ToDoDataModalController.prototype.onClickSaveNewTodo = function(event){
    const toDoInfo = this.todoDataModalView.getTodoItemModalInfo();
    this.todoDataModalView.validateTitle(toDoInfo.title.trim());
    if(toDoInfo.title.trim()){
        this.todoManager.addNewTodoItem(toDoInfo);
        this.todoDataModalView.destroyActiveDataModal();
    }
    this.todoManager.renderTodoList();
    event.stopPropagation();
}

ToDoDataModalController.prototype.onClickUpdateTodo = function(event){
    const toDoInfo= this.todoDataModalView.getTodoItemModalInfo();
    this.todoDataModalView.validateTitle(toDoInfo.title.trim());
    if(toDoInfo.title.trim()){
        this.todoManager.updateTodoItem(toDoInfo);
        this.todoDataModalView.destroyActiveDataModal();
        this.todoManager.setActiveTodoToEdit(null);
    }
    this.todoManager.renderTodoList();
    event.stopPropagation();
}

ToDoDataModalController.prototype.onClickDeleteConfirmSelectedTodo = function(){
    let itemsToDelete = this.todoManager.getIdsOfTodo("isChecked",true);
    let action=ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO;
    this.todoManager.modifyTodoItemsOfList(itemsToDelete,action); 
    this.todoDataModalView.destroyActiveDataModal();
    event.stopPropagation();
}

ToDoDataModalController.prototype.onClickCommitTodoListChanges = function(){
    this.todoManager.commitTodoListChanges();
    this.todoDataModalView.destroyActiveDataModal();
    event.stopPropagation();
}



export default ToDoDataModalController;