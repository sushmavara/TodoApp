import {todoActionHeaderSelectors} from '../../domSelectors/todoAppActionBarSelector'

function ToDoActionBarView(){
}

ToDoActionBarView.prototype.init = (toDoActionBarController) => {
    todoActionHeaderSelectors.addNewTodoBtn.addEventListener('click',toDoActionBarController.showDataModal.bind(toDoActionBarController));
    todoActionHeaderSelectors.deleteSelectedTodoBtn.addEventListener('click',toDoActionBarController.showDataModal.bind(toDoActionBarController));
    todoActionHeaderSelectors.markCompleteOnSelectedTodo.addEventListener('click',toDoActionBarController.onClickMarkCompleteSelectedTodo.bind(toDoActionBarController));
    todoActionHeaderSelectors.commitTodoListChanges.addEventListener('click',toDoActionBarController.showDataModal.bind(toDoActionBarController));
}

export default ToDoActionBarView;