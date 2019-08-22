import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'
import ToDoItemView from '../views/todoApp/ToDoItemView'

function ToDoItemController(){
    this.toDoItemView = new ToDoItemView();
}

ToDoItemController.prototype.init = function(todoManager) {
    this.toDoItemView.init(this);
    this.todoManager = todoManager;
}

ToDoItemController.prototype.onClickTodoItemWrapper = function(event){
    const itemID = event.target.parentNode.getAttribute('target-id');
    if(itemID){
        const action = event.target.getAttribute('data-action');
        switch(action){
            case ACTION_BUTTON_CLASS_NAME.EDIT_TODO:
                this.todoManager.setActiveTodoToEdit(itemID);
                this.todoManager.showAndFillDataModal(event.target.getAttribute("data-modal"));
                break;
            case ACTION_BUTTON_CLASS_NAME.CONFIRM_DELETE_TODO:
            case ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_TODO:
            case ACTION_BUTTON_CLASS_NAME.MARK_TODO_CHECKED:
                this.todoManager.modifyTodoItemsOfList([itemID],action);     
        } 
    }
    event.stopPropagation();
}

export default ToDoItemController;