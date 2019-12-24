import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Question} from '../model/question';
import {Observable} from 'rxjs';
import {Quiz} from '../model/quiz';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  listQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/questions');
  }

  listQuestionStatusIsTrue(): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/questionStatusIsTrue');
  }

  findAllQuestionByQuiz(id?: number): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + `/findAllQuestionByQuiz/${id}`);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(API_URL + `/questions`, question);
  }

  getQuestion(id: number): Observable<Question> {
    return this.http.get<Question>(API_URL + `/questions/${id}`);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(API_URL + `/questions/${id}`, question);
  }

  deleteQuestion(id: number): Observable<Question> {
    return this.http.delete<Question>(API_URL + `/questions/${id}`);
  }
}
