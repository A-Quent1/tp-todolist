import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() isSelected = new EventEmitter<Category>()

  categories$ = this._categoryService.categories$;

  constructor(private _categoryService: CategoryService) {}
  
  ngOnInit() {
    this._categoryService.findAll().subscribe();
  }

}