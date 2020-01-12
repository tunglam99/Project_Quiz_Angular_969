import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {ForgotPassword} from '../model/forgot-password';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.http.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/login', user);
  }

  passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
    return this.http.post<ForgotPassword>(API_URL + '/forgot-password', forgotPassword);
  }

  newPassword(user: User, token: string): Observable<User> {
    return this.http.post<User>(API_URL + `/new-password?token=` + token, user);
  }

  getUserProfile(id: string): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  updateUserProfile(id: number, user: User): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }

  changePassword(user: User, id: number): Observable<User> {
    return this.http.post<User>(API_URL + `/change-password/${id}`, user);
  }
}
