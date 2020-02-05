import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quiz} from '../model/quiz';
import {User} from '../model/user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {
  }

  listQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(API_URL + '/quizzes');
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(API_URL + `/quizzes`, quiz);
  }

  getQuiz(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(API_URL + `/quizzes/${id}`);
  }

  updateQuiz(id: number, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(API_URL + `/quizzes/${id}`, quiz);
  }

  deleteQuiz(id: number): Observable<Quiz> {
    return this.http.delete<Quiz>(API_URL + `/quizzes/${id}`);
  }
}
