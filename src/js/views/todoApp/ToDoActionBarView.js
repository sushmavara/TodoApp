import {elements} from '../domElements'

export function ToDoActionBarView(){
}

ToDoActionBarView.prototype.init = (todoListManager) => {
    elements.addNewTodoBtn.addEventListener('click',todoListManager.showDataModal.bind(todoListManager));
    elements.deleteSelectedTodoBtn.addEventListener('click',todoListManager.showDataModal.bind(todoListManager));
    elements.markCompleteOnSelectedTodo.addEventListener('click',todoListManager.onClickMarkCompleteSelectedTodo.bind(todoListManager));
}