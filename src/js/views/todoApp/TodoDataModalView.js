import {DomStrings} from '../domStrings'
export function TodoDataModalView (){
}

TodoDataModalView.prototype.attachDataModal= function(modalToAttach){
    document.body.appendChild(modalToAttach);
}

TodoDataModalView.prototype.destroyActiveDataModal= () =>{
   document.body.removeChild(document.querySelector(DomStrings.modal));
   event.stopPropagation();
}

TodoDataModalView.prototype.bindEvents = function(todoListManager) {
    let activeModal = document.querySelector(DomStrings.modal);
    let closeBtn = activeModal.querySelector(DomStrings.modalCloseBtn);
    let cancelBtn = activeModal.querySelector(DomStrings.modalCancelBtn);
    let saveBtn = activeModal.querySelector(DomStrings.modalSaveBtn);
    let updateBtn = activeModal.querySelector(DomStrings.modalUpdateBtn);
    let deleteOkBtn = activeModal.querySelector(DomStrings.modalDeleteBtn);
 
    [closeBtn,cancelBtn].forEach((current) => {
        current.addEventListener('click',
            todoListManager.todoDataModalView.destroyActiveDataModal);
    });

    if(saveBtn) saveBtn.addEventListener('click', todoListManager.onClickSaveNewTodo.bind(todoListManager));
    if(updateBtn) updateBtn.addEventListener('click',todoListManager.onClickUpdateTodo.bind(todoListManager));
    if(deleteOkBtn) deleteOkBtn.addEventListener('click',todoListManager.onClickDeleteSelectedTodo.bind(todoListManager));

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target === activeModal) {
            todoListManager.todoDataModalView.destroyActiveDataModal();
        }
    });
}

TodoDataModalView.prototype.validateTitle = (title)=>{
    if(!title){   
        document.querySelector(DomStrings.modal).querySelector(DomStrings.titleErrorMessage).style.visibility="visible";
        document.querySelector(DomStrings.modal).querySelector(DomStrings.toDoTitleInput).focus();
    }
}

TodoDataModalView.prototype.getTodoItemModalInfo = () => {
    return { 
        title:document.querySelector(DomStrings.toDoTitleInput).value,
        description:document.querySelector(DomStrings.toDoDescriptionInput).value,
        dueDate:document.querySelector(DomStrings.toDoDueDateInput).value
    }
}

TodoDataModalView.prototype.fillUpdateTodoItemModal = (data) => {
    document.querySelector(DomStrings.toDoTitleInput).value = data.title;
    document.querySelector(DomStrings.toDoDescriptionInput).value = data.description;
    document.querySelector(DomStrings.toDoDueDateInput).value = data.dueDate;
}
