import React from 'react'

import { addTodosAC, changeStatusAC, clearComplitedTodosAC, TodosReducer, TodosType } from './todos-reducer';


let startState: TodosType[]

beforeEach(() => {
    startState = [
        { id: 1, title: "Тестовое задание", isDone: true },
        { id: 2, title: "Прекрасный код", isDone: true },
        { id: 3, title: "Покрытие тестами", isDone: false },
    ]
})

test('correct todo should be deleted from correct array', () => {

    const action = clearComplitedTodosAC();
    const endState = TodosReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe("Покрытие тестами")
});

test('correct todo should be added to correct array', () => {

    const action = addTodosAC("juce")
    const endState = TodosReducer(startState, action)

    expect(endState.length).toBe(4)
    expect(endState[3].title).toBe("juce")
})

test('status of specified todo should be changed', () => {

    const action = changeStatusAC(2, false);
    const endState = TodosReducer(startState, action)

    expect(endState[1].isDone).toBeFalsy();
});





