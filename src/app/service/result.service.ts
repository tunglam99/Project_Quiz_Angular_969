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

  getResultListByUser(user: string): Observable<Result[]> {
    return this.http.get<Result[]>(API_URL + '/findAllResultByUser?user=' + user);
  }

  getResultListByExam(exam: string): Observable<Result[]> {
    return this.http.get<Result[]>(API_URL + '/findAllResultByExam?exam=' + exam);
  }

  getResultList(): Observable<Result[]> {
    return this.http.get<Result[]>(API_URL + '/results');
  }

  createResult(result: Result): Observable<Result> {
    return this.http.post<Result>(API_URL + `/results`, result);
  }

  getResult(id: number): Observable<Result> {
    return this.http.get<Result>(API_URL + `/results/${id}`);
  }
}
