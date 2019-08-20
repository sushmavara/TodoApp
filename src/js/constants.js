import addTodoModalTemplate from './templates/addTodoDataModalTemplate'
import updateTodoModalTemplate from './templates/updateTodoDataModalTemplate'
import deleteTodoModalTemplate from './templates/deleteTodoDataModalTemplate'


export const APPS_CLASS_NAME = {
    TODO_APP : '.toDoAppContainer',
    CALENDAR_APP : '.calendarAppContainer',
}

export const ACTION_BUTTON_CLASS_NAME = {
    ADD_NEW_TODO : 'addNewTodo',
    MARK_COMPLETE_SELECTED : 'markComplete',
    EDIT_TODO : 'editTodoItem',
    CONFIRM_DELETE_TODO : 'deleteTodoItem',
    MARK_COMPLETE_TODO : 'todoItemComplete',
    MARK_TODO_CHECKED : 'markTodoChecked'
}

export const MODALS_CLASS_NAME = {
    ADD_TODO_MODAL : "addItemModal",
    DELETE_TODO_MODAL : "deleteConfirmationModal",
    UPDATE_TODO_MODAL : "updateItemModal",
}

export const MODAL_TEMPLATE = {
    ADD_TODO_MODAL : addTodoModalTemplate,
    DELETE_TODO_MODAL : deleteTodoModalTemplate,
    UPDATE_TODO_MODAL : updateTodoModalTemplate,
}
