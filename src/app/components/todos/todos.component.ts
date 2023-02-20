import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos$ = this._todoService.todos$;
  toCreateTodo: Todo = {};

  categories$ = this._categoryService.categories$;
  toCreateCategory: Category = {};

  users$ = this._userService.users$;
  toCreateUser: User = {};

  constructor(private _todoService: TodoService, 
    private _categoryService: CategoryService,
     private _userService: UserService) {}
  
  ngOnInit() {
    this._todoService.findAll().subscribe();
    this._categoryService.findAll().subscribe();
    this._userService.findAll().subscribe();
  }

  changeStateOfTodo(todo: Todo) {
    todo.done = !todo.done;
    this._todoService.editOne(todo).subscribe();
  }

  createTodo() {
    if (this.toCreateTodo.text) {
      this._todoService
        .createOne(this.toCreateTodo)
        .subscribe(() => {
          this.toCreateTodo.text = '';
        });
    }
  }

  editTodo(todo: Todo) {
    todo.isEditable = !todo.isEditable;
    if (!todo.isEditable) {
      this._todoService
        .editOne(todo)
        .subscribe();
    }
  }

  onDelete(id?: string) {
    if (id) {
      this._todoService
      .deleteOne(id)
      .subscribe();
    }
  }

  findbyCategory(idCategory?: string) {
    if (idCategory) {
      this.toCreateCategory.id = idCategory;
    }
  }

  findbyUser(idUser?: string) {
    if (idUser) {
      this.toCreateUser.id = idUser;
    }
  }
}