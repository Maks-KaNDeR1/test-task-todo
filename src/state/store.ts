import { combineReducers, legacy_createStore as createStore } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { TodosActionsType, TodosReducer } from './todos-reducer';


const rootReducer = combineReducers({
    todos: TodosReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof store.getState>

type AppActionsType = TodosActionsType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;

