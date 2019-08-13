import {elements} from '../domElements'

export function ToDoActionBarView(){
}

ToDoActionBarView.prototype.init = (todoManager) => {
    elements.addNewTodoBtn.addEventListener('click',todoManager.showDataModal.bind(todoManager));
    elements.deleteSelectedTodoBtn.addEventListener('click',todoManager.showDataModal.bind(todoManager));
    elements.markCompleteOnSelectedTodo.addEventListener('click',todoManager.onClickMarkCompleteSelectedTodo.bind(todoManager));
}