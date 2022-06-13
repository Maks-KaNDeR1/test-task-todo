import React, { useState } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './state/hook';
import { addTodosAC, changeStatusAC, clearComplitedTodosAC } from './state/todos-reducer';
import { Todolist } from './Todos/Todos';

export type FilterValueType = 'all' | 'completed' | 'active'


function App() {

    const todos = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()

    const [filter, setFilter] = useState<FilterValueType>('all')

    const ClearComplitedTodos = () => {
        dispatch(clearComplitedTodosAC())
    }

    const onChangeCheckboxStatus = (id: number, value: boolean) => {
        dispatch(changeStatusAC(id, value))
    }

    const addTodos = (title: string) => {
        dispatch(addTodosAC(title))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    let todosForTodolist = todos
    if (filter === 'active') {
        todosForTodolist = todos.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        todosForTodolist = todos.filter(t => t.isDone === true)
    }


    return (
        <div className="App">
            <Todolist todos={todosForTodolist}
                ClearComplited={ClearComplitedTodos}
                changeFilter={changeFilter}
                onChangeCheckboxStatus={onChangeCheckboxStatus}
                addTodos={addTodos}
                filter={filter}
            />
        </div>
    );
}

export default App;
