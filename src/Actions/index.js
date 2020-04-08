/**
 * Redux actions for adding a task
 */
export const addTodo = (title, status) => {

    return {
        type: "ADD_TODO",
        newTodo: {
            title,
            status
        }
    }
}