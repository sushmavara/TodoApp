export const elements = {
    menuItems : document.getElementsByClassName("menu-item"),
    navLinks : document.getElementsByClassName("nav-links"),
    todoAppNavBar : document.querySelector('.to-do-app-nav'),
    calendarAppNavBar : document.querySelector('.calendar-app-nav'),
    toDoTitleInput : document.querySelector('.todo-title'),
    toDoDescriptionInput : document.querySelector('.todo-description'),
    toDoDueDateInput : document.querySelector('.todo-due-date'),
    addTodoItemModal : document.querySelector('#add-item-modal'),
    saveTodoItem : document.querySelector('#add-item-modal .save-todo-item'),
    toDoItemsList : document.querySelector('.todo-items-ul-list'),
    toDoListContainer : document.querySelector('.todo-list'),
    emptyContent : document.querySelector('.empty-content'),
    addModalErrorMessage : document.querySelector('.error-message'),
    deleteConfirmationModal : document.querySelector('#delete-confirmation-modal'),
    deleteSelected : document.querySelector('#delete-selected'),
    markCompleteOnSelectedItems : document.querySelector("#mark-complete"),
}

export const modalsName = {
    addTodoItemModal : 'add-item-modal',
    deleteTodoItemModal : 'delete-confirmation-modal'
}