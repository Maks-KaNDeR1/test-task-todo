import React, { ChangeEvent } from 'react'
import { TodosType } from '../../state/todos-reducer'
import style from './TodosMap.module.scss'


type PropsType = {
    todos: TodosType[]
    onChangeCheckbox: (tID: number, value: boolean) => void
}


export const TodosMap: React.FC<PropsType> = ({ todos, onChangeCheckbox }) => {

    const onChangeCheckboxHandler = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        onChangeCheckbox(id, e.currentTarget.checked)
    }

    return (
        <div>
            {
                todos.map(t => {
                    return (
                        <div key={t.id} className={t.isDone ? `${style.itemBlock} ${style.isDone}` : style.itemBlock} >
                            <input
                                onChange={(e) => onChangeCheckboxHandler(t.id, e)}
                                type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TodosMap
