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

  findAllQuestionByCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByCategory?category=' + category);

  }

  findAllQuestionByTypeOfQuestion(typeOfQuestion: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByTypeOfQuestion?typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByCategoryAndTypeOfQuestion(typeOfQuestion: string, category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllByTypeOfQuestionAndCategory?typeOfQuestion=' + typeOfQuestion + '&category=' + category);
  }

  findAllQuestionByContent(content: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByContent?content=' + content);
  }

  findAllQuestionByContentAndTypeOfQuestionAndCategory(content: string, typeOfQuestion: string, category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByContentAndTypeOfQuestionAndCategory?content=' + content + '&typeOfQuestion=' + typeOfQuestion + '&category=' + category);
  }

  findAllQuestionByContentAndCategory(content: string, category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByContentContainingAndCategory?content=' + content + '&category=' + category);
  }

  findAllQuestionByContentAndTypeOfQuestion(content: string, typeOfQuestion): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByContentContainingAndTypeOfQuestion?content=' + content + '&typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByQuizIsNullAndContentContaining(content: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndContentContaining?content=' + content);
  }

  findAllQuestionByQuizIsNullAndCategory(category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndCategory?category=' + category);
  }

  findAllQuestionByQuizIsNullAndTypeOfQuestion(typeOfQuestion: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndTypeOfQuestion?typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByQuizIsNullAndCategoryAndTypeOfQuestion(category: string, typeOfQuestion: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndCategoryAndTypeOfQuestion?category=' + category + '&typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByQuizIsNullAndContentContainingAndCategory(content: string, category: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndContentContainingAndCategory?content=' + content + '&category=' + category);
  }

  findAllQuestionByQuizIsNullAndContentContainingAndTypeOfQuestion(content: string, typeOfQuestion: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndContentContainingAndTypeOfQuestion?content=' + content + '&typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByQuizIsNullAndContentContainingAndCategoryAndTypeOfQuestion(content: string, category: string, typeOfQuestion: string): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizIsNullAndContentContainingAndCategoryAndTypeOfQuestion?content=' + content + '&category=' + category + '&typeOfQuestion=' + typeOfQuestion);
  }

  findAllQuestionByQuiz(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(API_URL + `/findAllQuestionByQuiz/${id}`);
  }

  findAllQuestionByQuizNull() {
    return this.http.get<Question[]>(API_URL + '/findAllQuestionByQuizNull');
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
