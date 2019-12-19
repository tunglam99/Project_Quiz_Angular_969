import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Answer} from '../model/answer';
import {environment} from '../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) {
  }

  listAnswerByQuestion(questionId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(API_URL + `/answers/${questionId}`);
  }

  createAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(API_URL + '/answers', answer);
  }

  updateAnswer(answer: Answer, id: number): Observable<Answer> {
    return this.http.put<Answer>(API_URL + `/answers/${id}`, answer);
  }

  deleteAnswer(id: number): Observable<Answer> {
    return this.http.delete<Answer>(API_URL + `/answers/${id}`);
  }

  getAnswer(id: number): Observable<Answer> {
    return this.http.get<Answer>(API_URL + `/getAnswer/${id}`);
  }
}
