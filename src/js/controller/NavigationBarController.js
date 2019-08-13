
import {elements} from '../views/domElements'
import {APPS_CLASS_NAME} from '../constants'


export function NavigationBarController(){
    this.currentActiveTab = elements.todoAppNavBar;
    this.currentDisplayedContent = elements.todoAppContent;
}

NavigationBarController.prototype.init = function(){
    elements.todoAppNavBar.addEventListener('click',this.showContent(APPS_CLASS_NAME.TODO_APP));
    elements.calendarAppNavBar.addEventListener('click',this.showContent(APPS_CLASS_NAME.CALENDAR_APP));
}


NavigationBarController.prototype.showContent = function(contentToShow) {
    let that=this;
    return function(evnt){
        if(evnt.currentTarget !== that.currentActiveTab)
        {
            let activeContentToDisplay = document.querySelector(contentToShow);
            evnt.currentTarget.classList.add('active');
            that.currentActiveTab.classList.remove('active');
            that.currentDisplayedContent.style.display = "none";
            activeContentToDisplay.style.display = "block";
            that.currentDisplayedContent = activeContentToDisplay;
            that.currentActiveTab = evnt.currentTarget;   
        } 
    }
  }