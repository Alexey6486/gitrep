import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {repsReducer} from '../Reducers/repsReducer'

const rootReducers = combineReducers({
    repsReducer,
});

export type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));