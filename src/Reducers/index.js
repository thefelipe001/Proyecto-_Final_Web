
/**
 * Combine reducer, currently only holding the one reducer,
 * with the possibility of combining all reducers for this project if more
 * where to be added.
 */
import {combineReducers } from 'redux';
import todoListReducer from './todoListReducer';

const allReducers = combineReducers(
    {
        todoList: todoListReducer
    }
);

export default allReducers;