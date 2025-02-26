import {Todo} from '../models/todo';
import { createTodoHtml } from './create-todo-hmtl';

let element;
export const renderTodos = (elementID, todos) => {

    if(!element){
        element = document.querySelector(elementID);
    }
        console.log(elementID, todos);

        element.innerHTML = '';
        todos.forEach(todo => {
            element.append(createTodoHtml(todo))
        });
}