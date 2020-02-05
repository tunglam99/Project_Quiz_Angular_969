import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from '../model/result';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) {
  }

  getResultList(): Observable<Result[]> {
    return this.http.get<Result[]>(API_URL + '/results');
  }

  createResult(result: Result): Observable<Result> {
    return this.http.post<Result>(API_URL + '/results', result);
  }

  updateResult(id: number, result: Result): Observable<Result> {
    return this.http.put<Result>(API_URL + '/results', result);
  }

  getResult(id: number): Observable<Result> {
    return this.http.get<Result>(API_URL + '/results');
  }

  deleteResult(id: number): Observable<Result> {
    return this.http.delete<Result>(API_URL + '/results');
  }
}
