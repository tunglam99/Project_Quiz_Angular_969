import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../model/category';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
  }
  listCategory(): Observable<Category[]> {
    const currentUser = this.authenticationService.currentUserValue;
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${currentUser.accessToken}`);
    return this.http.get<Category[]>(API_URL + '/categories', { headers });
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/categories', category);
  }
}
