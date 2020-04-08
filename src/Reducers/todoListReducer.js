/**
 * Todo list reducer with some initial objects
 */
const todoListReducer = (state = [
        {title: "Update storage", status: true},
        {title: "Add more storage units", status: false},
        {title: "Add the pair of Chair 66's that arrived yesterday", status: true},
        {title: "Add new tables", status: false},
        {title: "Change image for LCM chair to better quality.", status: false},
        {title: "The vintage PH5 Lamp was sold, remember to remove from stock.", status: false},
        {title: "Ask IT to add a new furniture category to the admin.", status: false}
    ], 
    action) => {
        switch(action.type) {
            case "ADD_TODO":
                const todoList = state.map( todo => todo );
                todoList.push(action.newTodo);
                return todoList;
            default:
                return state;
        }
}

export default todoListReducer;