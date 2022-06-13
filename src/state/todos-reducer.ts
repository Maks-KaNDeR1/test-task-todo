
export type TodosType = {
    id: number
    title: string
    isDone: boolean
}


let initialState: TodosType[] = [
    { id: 1, title: "Тестовое задание", isDone: true },
    { id: 2, title: "Прекрасный код", isDone: true },
    { id: 3, title: "Покрытие тестами", isDone: false },
    { id: 4, title: "Отдохнуть", isDone: false },
    { id: 5, title: "Выучить английский", isDone: true },
    { id: 6, title: "Сходить в магазин", isDone: false }
]


export const TodosReducer = (state = initialState, action: TodosActionsType) => {
    switch (action.type) {
        case 'CLEAR-COMPLITED-TODOS':
            return state.filter(t => t.isDone !== true)
        case 'ADD-TODOS':
            return [
                ...state, {
                    id: +new Date(),
                    title: action.title,
                    isDone: false
                }
            ]
        case 'CHANGE-STATUS-TODOS': {
            return state.map(t => t.id === action.id ? { ...t, isDone: action.value } : t)
        }
        default:
            return state
    }
}

type ClearComplitedTodosType = ReturnType<typeof clearComplitedTodosAC>
export const clearComplitedTodosAC = () =>
    ({ type: 'CLEAR-COMPLITED-TODOS' } as const)

type AddTodosActionType = ReturnType<typeof addTodosAC>
export const addTodosAC = (title: string) =>
    ({ type: 'ADD-TODOS', title } as const)

type changeStatusActionType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todosId: number, value: boolean) =>
    ({ type: 'CHANGE-STATUS-TODOS', value, id: todosId } as const)


export type TodosActionsType = ClearComplitedTodosType
    | AddTodosActionType
    | changeStatusActionType

