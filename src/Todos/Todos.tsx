import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType } from '../App';
import TodosMap from './TodosMap/TodosMap';
import style from './Todos.module.scss'
import { TodosType } from '../state/todos-reducer';


type PropsType = {
    todos: TodosType[]
    changeFilter: (value: FilterValueType) => void
    addTodos: (newTaskTitle: string) => void
    onChangeCheckboxStatus: (id: number, value: boolean) => void
    filter: FilterValueType
    ClearComplited: () => void
}

export const Todolist: React.FC<PropsType> = (
    { todos, changeFilter, addTodos, onChangeCheckboxStatus, filter, ClearComplited }
) => {

    const [newTodos, setNewTodos] = useState('')
    const [error, setError] = useState(false)

    const onChangeCheckbox = (tID: number, value: boolean) => {
        onChangeCheckboxStatus(tID, value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTodos(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTodos.trim() !== '') {
                addTodos(newTodos.trim())
                setNewTodos('')
            } else {
                setError(true)
            }
        }
    }

    const addTodosOnClick = () => {
        if (newTodos.trim() !== '') {
            addTodos(newTodos.trim())
            setNewTodos('')
        } else {
            setError(true)
        }
    }

    const itemsLeft = todos.filter(t => t.isDone === false).length

    const onFilterClickHandler = (value: FilterValueType) => changeFilter(value)

    return (
        <div className={style.todos}>
            <h3>todos</h3>
            <div className={style.todosBlock}>
                <div className={error ? `${style.error} ${style.inputBlock}` : style.inputBlock}>
                    <input placeholder='New todos...'
                        value={newTodos}
                        onChange={onChangeHandler}
                        onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTodosOnClick}></button>
                    {error && <div className={style.errorMessage}>title is require!</div>}
                </div>
                <div>
                    <TodosMap todos={todos}
                        onChangeCheckbox={onChangeCheckbox}
                    />
                </div>
                <div className={style.footer} >
                    <button className={style.button}>{itemsLeft} items left</button>
                    <div style={{ marginTop: '5px' }} >
                        <button className={filter === 'all' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('all')}>
                            All
                        </button>
                        <button className={filter === 'active' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('active')}>
                            Active
                        </button>
                        <button className={filter === 'completed' ? style.activeFilter : style.button}
                            onClick={() => onFilterClickHandler('completed')}>
                            Completed
                        </button>
                    </div>
                    <button onClick={() => ClearComplited()} className={style.button}>
                        Clear Complited
                    </button>
                    <div className={style.before}></div>
                </div>
            </div>
        </div>
    )
}
