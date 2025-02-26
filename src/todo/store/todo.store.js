import {Todo} from '../todos/models/todo';

export const Filters =  {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}
const state = {
    todos: [
        new Todo('piedra del alma'),
        new Todo('Piedra de la realidad'),
        new Todo('Piedra de la mente'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;
}

const saveStateStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const getTodo = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
            break;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
            break;
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
            break;
        default:
            throw new Error(`opcion ${filter} no es valida`);
            
            break;
    }
}

const aadTodo = (description) => {
    if (!description) throw new Error("Descripcion requerida");
    
    state.todos.push(new Todo(description));
    saveStateStorage();
}
const toogleTodo = (todoID) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoID){
            todo.done = !todo.done;
            
        }
        return todo;
    });
    saveStateStorage();

}

const deleteTodo = (todoID) => {
    state.todos = state.todos.filter(todo => todo.id !== todoID);
    saveStateStorage();
}

const deleteAll = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateStorage();
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    getTodo, 
    loadStore,
    aadTodo,
    toogleTodo,
    deleteTodo,
    deleteAll,
    setFilter,
    getCurrentFilter
}