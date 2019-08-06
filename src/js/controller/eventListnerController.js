import {showContent} from '../index'
import {showDataModal, onClickAddNewTodo , onClickUpdateTodo , onClickDeleteSelectedTodo , 
    onClickMarkCompleteSelectedTodo, onClickTodoItem} from './ToDoManager'
import {elements , DomStrings} from '../views/DomElements'
import {APPS_NAME} from '../constants'


export function initEventListners() {
    elements.todoAppNavBar.addEventListener('click',showContent(APPS_NAME.TODO_APP));
    elements.calendarAppNavBar.addEventListener('click',showContent(APPS_NAME.CALENDAR_APP));

    elements.addNewTodoBtn.addEventListener('click',showDataModal);
    elements.deleteSelectedTodoBtn.addEventListener('click',showDataModal);
    elements.markCompleteOnSelectedTodo.addEventListener('click',onClickMarkCompleteSelectedTodo);
    elements.toDoItemsList.addEventListener('click',onClickTodoItem);
}

export function initDataModalEventListners() {
    let activeModal = document.querySelector(DomStrings.modal);
    let closeBtn = activeModal.querySelector(DomStrings.modalCloseBtn);
    let cancelBtn = activeModal.querySelector(DomStrings.modalCancelBtn);
    let saveBtn = activeModal.querySelector(DomStrings.modalSaveBtn);
    let updateBtn = activeModal.querySelector(DomStrings.modalUpdateBtn);
    let deleteOkBtn = activeModal.querySelector(DomStrings.modalDeleteBtn);

    function destroyModal(){
        document.body.removeChild(activeModal);
    }

    [closeBtn,cancelBtn].forEach((current) => {
        current.addEventListener('click',() => {
          destroyModal(activeModal);
      })
    });

    if(saveBtn) saveBtn.addEventListener('click', onClickAddNewTodo);
    if(updateBtn) updateBtn.addEventListener('click',onClickUpdateTodo);
    if(deleteOkBtn) deleteOkBtn.addEventListener('click',onClickDeleteSelectedTodo);

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target === activeModal) {
          destroyModal(activeModal);
        }
    });
}