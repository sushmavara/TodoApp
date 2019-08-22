
import ToDoActionBarView from '../views/todoApp/ToDoActionBarView'
import {ACTION_BUTTON_CLASS_NAME} from '../constants/todoActionConstants'

function TodoActionBarController(){
    this.todoActionBarView = new ToDoActionBarView();
}

TodoActionBarController.prototype.init = function(todoManager) {
    this.todoActionBarView.init(this);
    this.todoManager = todoManager;
}

TodoActionBarController.prototype.showDataModal = function() {
    const modalAction = event.target.getAttribute("data-modal");
    this.todoManager.showAndFillDataModal(modalAction);
  }

TodoActionBarController.prototype.onClickMarkCompleteSelectedTodo = function(){
    let itemsToUpdate = this.todoManager.getIdsOfTodo("isChecked",true);
    let action=ACTION_BUTTON_CLASS_NAME.MARK_COMPLETE_SELECTED;
    this.todoManager.modifyTodoItemsOfList(itemsToUpdate,action);
    event.stopPropagation();
}

export default TodoActionBarController;