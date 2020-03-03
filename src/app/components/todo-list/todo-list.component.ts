import { Component, OnInit } from '@angular/core';
import { Todo } from '../../interfaces/Todo';
import { animation, trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('fade', [

      transition(':enter',[
        style({ opacity: 0, transform: 'translateY(30px'}),
        animate(400, style({opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave',[
        animate(400, style({opacity: 0, transform: 'translateY(30px)'}))
      ])

    ])
  ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  anyRemainingModel: boolean;

  constructor() { }

  ngOnInit(): void {
    this.anyRemainingModel = true;
    this.filter = 'all';
    this.beforeEditCache = '';
    this.idForTodo = 4;
    this.todoTitle = '';
    this.todos = [
      {
        'id': 1,
        'title': 'Koliko CodeBase',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Pesewa Websoft - Sunyani',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'Learn the Basis of Angular',
        'completed': false,
        'editing': false,
      },
      {
        'id': 4,
        'title': 'Koliko Mart',
        'completed': false,
        'editing': false,

      },
      {
        'id': 0,
        'title': 'Quiz',
        'completed':false,
        'editing':false,
      },
      {
        'id': 5,
        'title': 'Elections - 5th April',
        'completed':false,
        'editing':false,
      },
    ];
  }



  addTodo(): void {
    if (this.todoTitle.trim().length===0){
      return;
    }
   
    this.todos.push ({
      id: this.idForTodo, 
      title: this.todoTitle,
      completed: false,
      editing: false
    }) 

    this.todoTitle = '';
    this.idForTodo++ ;
  }

  

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo =>todo.id !== id);

  }


  doneEdit(todo: Todo): void {
    if (todo.title.trim().length===0) {
      todo.title = this.beforeEditCache;
    }
    this.anyRemainingModel = this.anyRemaining();
    todo.editing= false;

  }


  editTodo (todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;

  }



  cancelEdit(todo: Todo): void {
    
    todo.title = this.beforeEditCache;
  
    todo.editing = false;

  }


  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean{
    return this.todos.filter(todo => todo.completed).length > 0;

  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);

  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
    this.anyRemainingModel = this.anyRemaining();

  }

  anyRemaining(): boolean{
    return this.remaining() !==0;
  }


  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active'){
      return this.todos.filter(todo => !todo.completed);
    } else if(this.filter === 'completed'){
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos
  }






}

