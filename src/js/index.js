import {initEventListners} from './controller/eventListnerController'
import * as ConfigVariable from './config'

let currentActiveTab = ConfigVariable.currentActiveTab;
let currentDisplayedContent = ConfigVariable.currentDisplayedContent;

/*** Control the app content to be displayed ***/
export const showContent = (contentToShow) => (evnt) => {
    if(evnt.currentTarget !== currentActiveTab)
    {
        let activeContentToDisplay = document.getElementById(contentToShow);
        evnt.currentTarget.classList.add('active');
        currentActiveTab.classList.remove('active');
        currentDisplayedContent.style.display = "none";
        activeContentToDisplay.style.display = "block";
        currentDisplayedContent = activeContentToDisplay;
        currentActiveTab = evnt.currentTarget;   
    } 
  }

// initialize event listeners  
document.onload = initEventListners();