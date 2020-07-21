import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import {repsReducer} from '../Reducers/repsReducer'
import {repInfo} from "../Reducers/repInfoReducer";

const rootReducers = combineReducers({
    repsReducer,
    repInfo,
});

export type AppRootState = ReturnType<typeof rootReducers>;

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));