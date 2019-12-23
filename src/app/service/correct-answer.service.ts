import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CorrectAnswer} from '../model/correct-answer';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CorrectAnswerService {

  constructor(private http: HttpClient) {
  }

  listCorrectAnswerByQuestion(questionId: number): Observable<CorrectAnswer[]> {
    return this.http.get<CorrectAnswer[]>(API_URL + `/correctAnswers/${questionId}`);
  }

  createCorrectAnswer(correctAnswer: CorrectAnswer): Observable<CorrectAnswer> {
    return this.http.post<CorrectAnswer>(API_URL + '/correctAnswers', correctAnswer);
  }

  updateCorrectAnswer(correctAnswer: CorrectAnswer, id: number): Observable<CorrectAnswer> {
    return this.http.put<CorrectAnswer>(API_URL + `/correctAnswers/${id}`, correctAnswer);
  }

  deleteCorrectAnswer(id: number): Observable<CorrectAnswer> {
    return this.http.delete<CorrectAnswer>(API_URL + `/correctAnswers/${id}`);
  }

  getCorrectAnswer(id: number): Observable<CorrectAnswer> {
    return this.http.get<CorrectAnswer>(API_URL + `/getCorrectAnswer/${id}`);
  }
}
