import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Question} from "../model/question";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }
createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>( API_URL + ``, question);
}
}
