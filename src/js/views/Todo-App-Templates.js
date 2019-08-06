export const addTodoModalTemplate = '<div id="add-item-modal" class="modal"><div class="modal-content"><div class="modal-header"><i class="icon ion-md-close close-button"></i>'+
'<h3> Add New Todo Item</h3></div><div class="modal-body"><div><label for="title"> Title : </label><br><input type="text" name="title" class="todo-title input-element"><span class="error-message"></span>'+
'</div> <div><label for="due-date"> Due Date : </label><br><input type="date" name="due-date" class="todo-due-date input-element"><span class="error-message"></div><div><label for="description"> Description : </label><br>'+
'<textarea name="description" cols="30" rows="5" class="todo-description input-element"></textarea></div></div><div class="modal-footer"><button class="save-todo-item">'+
'Save</button><button class="cancel">Cancel</button></div></div></div></div>';

export const updateTodoModalTemplate = '<div id="update-item-modal" class="modal"><div class="modal-content"><div class="modal-header"><i class="icon ion-md-close close-button"></i>'+
'<h3> Update Todo Item</h3></div><div class="modal-body"><div><label for="title"> Title : </label><br><input type="text" name="title" class="todo-title input-element">'+
'</div> <div><label for="due-date"> Due Date : </label><br><input type="date" name="due-date" class="todo-due-date input-element"></div><div><label for="description"> Description : </label><br>'+
'<textarea name="description" cols="30" rows="5" class="todo-description input-element"></textarea></div></div><div class="modal-footer"><button class="update-todo-item">'+
'Update</button><button class="cancel">Cancel</button></div></div></div></div>';

export const deleteTodoModalTemplate = '<div id="delete-confirmation-modal" class="modal"><div class="modal-content"><div class="modal-header"><i class="icon ion-md-close close-button"></i>'+
'<h3> Delete ToDo  <!--Check for update and change the text--></h3></div><div class="modal-body"><div><p> Do you want to delete selected todo items ?</p>'+
'</div></div><div class="modal-footer"><button class="delete-todo-item"> Yes</button><button class="cancel">Discard</button></div></div></div>';


// export const todoItemTemplate = '<li class="list-item"><div class="item" id="todo-list-item-%id%"><input type="checkbox"  class="margin-left-20 item-select"><div title="title" class="title">%title%</div>'+
// '<div title="Description" class="description">%description%</div><div class="due-date">%due-date%</div><i class="icon ion-md-create" id="edit-todo-item"></i><i class="icon ion-md-checkmark" id="todo-item-complete">'+
// '</i><i class="icon ion-md-trash" id="delete-todo-item"></i></div></li>'


export const todoItemTemplate = '<li id="todo-list-item-%id%" class="item"><input type="checkbox"  class="margin-left-20 item-select"><div title="title" class="title">%title%</div>'+
'<div title="Description" class="description">%description%</div><div class="due-date">%due-date%</div><i class="icon ion-md-create" id="edit-todo-item"></i><i class="icon ion-md-checkmark" id="todo-item-complete">'+
'</i><i class="icon ion-md-trash" id="delete-todo-item"></i></li>'