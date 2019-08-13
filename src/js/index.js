import {ToDoListManager} from './controller/ToDoListManager'
import {NavigationBarController} from './controller/NavigationBarController'

// initialize navigation controller 
let navigationController = new NavigationBarController();
navigationController.init();

//initialize todo Manager 
let todoListManager = new ToDoListManager();
todoListManager.init();