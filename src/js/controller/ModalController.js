import {clearFormData} from '../views/ToDoItemActionView'
import {elements , modalsName} from '../views/DomElements'


function initDataModalToggleBtns(modalID,modal,btn)
{
  debugger;
  btn.addEventListener('click', () => {
      modal.classList.toggle("show-modal");
        switch (modalID){
          case modalsName.addTodoItemModal:
            elements.saveTodoItem.classList.add('save-todo-item');
            elements.saveTodoItem.classList.remove('update-todo-item');
            elements.saveTodoItem.textContent="Save";
            elements.addTodoItemModal.querySelector('h3').textContent="Add New Todo Item";
            clearFormData();
            break;
        }
      });
}

export function initializeModal(modalID, buttonID) {
    let modal = document.getElementById(modalID);
    let btn = document.getElementById(buttonID);
    let closeBtn = modal.querySelector('.close-button');
    let cancelBtn= modal.querySelector('.cancel');
    //toggle show-modal class
    function toggleModal()
    {
        modal.classList.toggle("show-modal");
    }
      
    [closeBtn,cancelBtn].forEach((current) => {
        current.addEventListener('click',() => {
            toggleModal(modal);
        })
    });
    
    // init modals on btn click
    initDataModalToggleBtns(modalID,modal,btn);
 
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.classList.toggle("show-modal");
      }
    });
  }
