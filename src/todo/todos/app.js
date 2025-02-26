
import html from './app.html?raw';
import todoStore, {Filters} from '../store/todo.store';
import {renderTodos} from './use-cases'

const ElementIDs = {
    ClearCompleated: '.clear-completed',
    TodoList: '.todo-list',
    newTodo: '#new-todo-input',
    todoFilters: '.filtro',
    Pend: '#pending-count',
}

export const App = (ElementID) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo(todoStore.getCurrentFilter());
        renderTodos( ElementIDs.TodoList,todos);
        updatePending();
    }

    const updatePending = () =>{
        let pendientes;
        pendientes = document.querySelector(ElementIDs.Pend);
        pendientes.innerHTML = todoStore.getTodo(Filters.Pending).length;
    }

    (() => {

        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(ElementID).append(app); 

        displayTodos();
    }) ();

    const newDescription = document.querySelector(ElementIDs.newTodo);
    const todoListUl = document.querySelector(ElementIDs.TodoList);
    const deleteElement = document.querySelector(ElementIDs.TodoList);
    const ClearCompleated =document.querySelector(ElementIDs.ClearCompleated);
    const FiltersUL = document.querySelectorAll(ElementIDs.todoFilters);

    newDescription.addEventListener('keyup', (Event) => {
        if(Event.keyCode !== 13) return;
        if(Event.target.value.trim().length === 0) return;

        todoStore.aadTodo(Event.target.value);
        displayTodos();
    });
    
    todoListUl.addEventListener('click', (Event) => {

        const element = Event.target.closest('[data-id]');
        todoStore.toogleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    deleteElement.addEventListener('click', (Event) => {
        const destroy = Event.target.closest('[class]');
        const element = Event.target.closest('[data-id]');
        console.log(destroy.getAttribute('class'));

        if(destroy.getAttribute('class') === 'destroy'){
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    })

    ClearCompleated.addEventListener('click', (Event) => {

        const destroy = Event.target.closest('[class]');
        if(destroy.getAttribute('class') === 'clear-completed'){
            todoStore.deleteAll();
            displayTodos();
        }
    })
    
    FiltersUL.forEach(element => {
        element.addEventListener('click', (elemen) =>{
        
            FiltersUL.forEach(el => el.classList.remove('selected'));
           elemen.target.classList.add('selected');

           switch(elemen.target.text){
            case 'Todos': todoStore.setFilter(Filters.All) 
            break;
            case 'Pendientes': todoStore.setFilter(Filters.Pending)
            break;
            case 'Completados': todoStore.setFilter(Filters.Completed)
            break;
           }
           displayTodos();
        })
    });
    

}