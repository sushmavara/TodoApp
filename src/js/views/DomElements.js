export const elements = {
    todoAppNavBar : document.querySelector('.to-do-app-nav'),
    calendarAppNavBar : document.querySelector('.calendar-app-nav'),

    todoAppContent : document.querySelector('#to-do-app-content'),
    toDoListContainer : document.querySelector('#todo-list-container'),
    toDoItemsList : document.querySelector('.todo-items-ul-list'),

    addNewTodoBtn : document.getElementById('add-new-todo'),
    deleteSelectedTodoBtn : document.getElementById('delete-selected'),
    markCompleteOnSelectedTodo : document.getElementById("mark-complete"),

    emptyContent : document.querySelector('.empty-content'),
}


export const DomStrings = {
    modal : '.modal',
    modalCloseBtn : '.close-button',
    modalCancelBtn : '.cancel',
    modalSaveBtn : '.save-todo-item',
    modalUpdateBtn : '.update-todo-item',
    modalDeleteBtn : '.delete-todo-item',
    toDoTitleInput : '.todo-title',
    toDoDescriptionInput : '.todo-description',
    toDoDueDateInput : '.todo-due-date',
    titleErrorMessage : '.error-message',

    todoTitle : '.title',
    todoDescription : '.description',
    todoDueDate : '.due-date',
}