import {DataModalDomStrings}  from '../../domSelectors/dataModalElementsSelector'


function TodoDataModalView (){
}

TodoDataModalView.prototype.attachDataModal= function(modalToAttach){
    document.body.appendChild(modalToAttach);
}

TodoDataModalView.prototype.destroyActiveDataModal= () =>{
   document.body.removeChild(document.querySelector(DataModalDomStrings.modal));
   event.stopPropagation();
}

TodoDataModalView.prototype.bindEvents = function(toDoDataModalController) {
    let activeModal = document.querySelector(DataModalDomStrings.modal);
    let closeBtn = activeModal.querySelector(DataModalDomStrings.modalCloseBtn);
    let cancelBtn = activeModal.querySelector(DataModalDomStrings.modalCancelBtn);
    let saveBtn = activeModal.querySelector(DataModalDomStrings.modalSaveBtn);
    let updateBtn = activeModal.querySelector(DataModalDomStrings.modalUpdateBtn);
    let deleteOkBtn = activeModal.querySelector(DataModalDomStrings.modalDeleteBtn);
    let commitChanges = activeModal.querySelector(DataModalDomStrings.commitChangesBtn);
 
    [closeBtn,cancelBtn].forEach((current) => {
        current.addEventListener('click',
        this.destroyActiveDataModal);
    });

    if(saveBtn) saveBtn.addEventListener('click', toDoDataModalController.onClickSaveNewTodo.bind(toDoDataModalController));
    if(updateBtn) updateBtn.addEventListener('click',toDoDataModalController.onClickUpdateTodo.bind(toDoDataModalController));
    if(deleteOkBtn) deleteOkBtn.addEventListener('click',toDoDataModalController.onClickDeleteConfirmSelectedTodo.bind(toDoDataModalController));
    if(commitChanges) commitChanges.addEventListener('click',toDoDataModalController.onClickCommitTodoListChanges.bind(toDoDataModalController));

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (event) =>{
        if (event.target === activeModal) {
            this.destroyActiveDataModal();
        }
    });
}

TodoDataModalView.prototype.validateTitle = (title)=>{
    if(!title){   
        document.querySelector(DataModalDomStrings.modal).querySelector(DataModalDomStrings.titleErrorMessage).style.visibility="visible";
        document.querySelector(DataModalDomStrings.modal).querySelector(DataModalDomStrings.toDoTitleInput).focus();
    }
}

TodoDataModalView.prototype.getTodoItemModalInfo = () => {
    return { 
        title:document.querySelector(DataModalDomStrings.toDoTitleInput).value,
        description:document.querySelector(DataModalDomStrings.toDoDescriptionInput).value,
        dueDate:document.querySelector(DataModalDomStrings.toDoDueDateInput).value
    }
}

TodoDataModalView.prototype.fillUpdateTodoItemModal = (data) => {
    document.querySelector(DataModalDomStrings.toDoTitleInput).value = data.title;
    document.querySelector(DataModalDomStrings.toDoDescriptionInput).value = data.description;
    document.querySelector(DataModalDomStrings.toDoDueDateInput).value = data.dueDate;
}


export default TodoDataModalView;
