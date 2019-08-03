class ToDoItem {
    constructor(title,description,dueDate)
    {
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.id=ToDoItem.count++;
        this.isCompleted=false;
    }
}
ToDoItem.count=0;

export default ToDoItem;
