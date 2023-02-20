import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _baseUrl = 'http://localhost:3000/categories';
  
  public categories$ = new BehaviorSubject<Category[]>([]);
  public currentCategory$ = new BehaviorSubject<Category>({});

  constructor( private _http: HttpClient) {}

  findAll(): Observable<Category[]> {
    return this._http
      .get<Category[]>(this._baseUrl)
      .pipe(
        tap(categories => this.categories$.next(categories))
      );
  }
}