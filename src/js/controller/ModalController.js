import {clearFormData} from '../views/ToDoItemActionView'

export function initializeModal(modalID, buttonID) {
    let modal = document.getElementById(modalID);
    let btn = document.getElementById(buttonID);
    let closeBtn = modal.querySelector('.close-button');
    let cancelBtn= modal.querySelector('.cancel');
    // toggle show-modal class
    function toggleModal()
    {
        modal.classList.toggle("show-modal");
    }
    // When the user clicks on the button, open the modal
    btn.addEventListener('click', toggleModal);
  
    [closeBtn,cancelBtn].forEach((current) => {
        current.addEventListener('click',() => {
            toggleModal(modal);
            if(modalID=='add-item-modal')
            {
                clearFormData();
            }
        })
    });
 
    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.classList.toggle("show-modal");
      }
    });
  }