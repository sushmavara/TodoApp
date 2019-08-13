import {DomStrings} from '../domStrings'
export function TodoDataModalView (){
    this.activeModal=null;
}

TodoDataModalView.prototype.attachDataModal= (modalToAttach) => {
    document.body.appendChild(modalToAttach);
    document.querySelector(DomStrings.modal).style.display="block";
}

TodoDataModalView.prototype.destroyActiveDataModal= () =>{
   document.body.removeChild(document.querySelector(DomStrings.modal));
}

TodoDataModalView.prototype.bindEvents = (todoManager) => {
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

    if(saveBtn) saveBtn.addEventListener('click', todoManager.onClickSaveNewTodo.bind(todoManager));
    if(updateBtn) updateBtn.addEventListener('click',todoManager.onClickUpdateTodo.bind(todoManager));
    if(deleteOkBtn) deleteOkBtn.addEventListener('click',todoManager.onClickDeleteSelectedTodo.bind(todoManager));

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
        if (event.target === activeModal) {
          destroyModal(activeModal);
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
