import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Category} from '../model/category';
import {Observable} from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }
  listCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + '/categories');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/categories', category);
  }
}
