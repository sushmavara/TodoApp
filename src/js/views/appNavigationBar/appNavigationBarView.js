import {appNavigationHeaderElements} from '../../domSelectors/appNavigationHeaderElements'
import {APPS_CLASS_NAME} from '../../constants/appNameConstants'

function AppNavigationBarView(){
}

AppNavigationBarView.prototype.init = function(appManager){
    appNavigationHeaderElements.todoAppNavBar.addEventListener('click',appManager.showContent(APPS_CLASS_NAME.TODO_APP));
    appNavigationHeaderElements.calendarAppNavBar.addEventListener('click',appManager.showContent(APPS_CLASS_NAME.CALENDAR_APP));
}

export default AppNavigationBarView;