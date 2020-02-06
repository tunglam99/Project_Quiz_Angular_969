import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentClass} from '../model/student-class';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class StudentClassService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<StudentClass[]> {
    return this.http.get<StudentClass[]>(API_URL + '/classes');
  }

  createClass(studentClass: StudentClass): Observable<StudentClass> {
    return this.http.post<StudentClass>(API_URL + '/classes', studentClass);
  }

  updateClass(studentClass: StudentClass, id: number): Observable<StudentClass> {
    return this.http.put<StudentClass>(API_URL + `/classes/${id}`, studentClass);
  }

  deleteClass(id: number): Observable<StudentClass> {
    return this.http.delete<StudentClass>(API_URL + `/classes/${id}`);
  }

  getClass(id: number): Observable<StudentClass> {
    return this.http.get<StudentClass>(API_URL + `/classes/${id}`);
  }
}
