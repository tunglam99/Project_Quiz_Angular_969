import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {Exam} from '../model/exam';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) {
  }

  listExam(): Observable<Exam[]> {
    return this.http.get<Exam[]>(API_URL + '/exams');
  }

  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(API_URL + `/exams`, exam);
  }

  getExam(id: number): Observable<Exam> {
    return this.http.get<Exam>(API_URL + `/exams/${id}`);
  }

  doExam(id: number): Observable<Exam> {
    return this.http.get<Exam>(API_URL + `/doExam/${id}`);
  }

  updateExam(id: number, exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(API_URL + `/exams/${id}`, exam);
  }

  deleteExam(id: number): Observable<Exam> {
    return this.http.delete<Exam>(API_URL + `/exams/${id}`);
  }

  joinExam(user: User, examId: number): Observable<Exam> {
    return this.http.post<Exam>(API_URL + `/join/${examId}`, user);
  }
}
