import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeOfQuestion} from '../model/type-of-question';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TypeOfQuestionService {

  constructor(private http: HttpClient) {
  }

  listTypeOfQuestion(): Observable<TypeOfQuestion[]> {
    return this.http.get<TypeOfQuestion[]>(API_URL + '/typeOfQuestions');
  }

  getTypeOfQuestion(id: number): Observable<TypeOfQuestion> {
    return this.http.get<TypeOfQuestion>(API_URL + `/typeOfQuestions/${id}`);
  }
}
