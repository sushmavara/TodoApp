import {APP_DISPLAY_CONFIG} from '../configs/appDisplayConfig'
import AppNavigationBarView from '../views/appNavigationBar/appNavigationBarView'
import ToDoManager from './ToDoManager'

function App() {
    this.currentActiveTab = APP_DISPLAY_CONFIG.currentActiveTab;
    this.currentDisplayedContent = APP_DISPLAY_CONFIG.currentDisplayedContent;
    this.appNavigationView= new AppNavigationBarView();
    this.todoManager = new ToDoManager();
}

App.prototype.initNavigation = function(){
    // initialize app navigation controller 
    this.appNavigationView.init(this);
}

App.prototype.initTodoManager = function(todoListData){
    //initialize todo Manager 
    this.todoManager.init(todoListData);
}


App.prototype.showContent = function(contentToShow) {
    return (evnt)=>{
        if(evnt.currentTarget !== this.currentActiveTab)
        {
            let activeContentToDisplay = document.querySelector(contentToShow);
            evnt.currentTarget.classList.add('active');
            this.currentActiveTab.classList.remove('active');
            this.currentDisplayedContent.style.display = "none";
            activeContentToDisplay.style.display = "block";
            this.currentDisplayedContent = activeContentToDisplay;
            this.currentActiveTab = evnt.currentTarget;   
        } 
    }
  }

export default App;