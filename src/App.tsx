import React, { useState } from 'react';
import './App.scss';
import { Todolist } from './Todolist/TodoList';

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const [filter, setFilter] = useState<FilterValueType>('all')
    const [todos, setTodos] = useState([
        { id: 1, title: "Тестовое задание", isDone: true },
        { id: 2, title: "Прекрасный код", isDone: true },
        { id: 3, title: "Покрытие тестами", isDone: false },
        { id: 4, title: "Отдохнуть", isDone: false },
        { id: 5, title: "Выучить английский", isDone: true },
        { id: 6, title: "Сходить в магазин", isDone: false }
    ])

    const ClearComplitedTodos = () => {
        setTodos(todos.filter(t => t.isDone !== true))
    }

    const onChangeCheckboxStatus = (id: number, value: boolean) => {
        setTodos(todos.map(t => t.id === id ? { ...t, isDone: value } : t))
    }

    const addTodos = (newTodosTitle: string) => {
        const newTodos = { id: +new Date(), title: newTodosTitle, isDone: false }
        setTodos([newTodos, ...todos])
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
