import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
//import { User } from '../Interfaces/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '../pages/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private endPoint: string = environment.endPoint;
  private apiUrl: string = this.endPoint + "login";
  constructor(private http: HttpClient) { }
  login(user: User): Observable<any> {

    return this.http.post(this.apiUrl, user);
  }
  setLocalStorage(data: string): void {
    localStorage.setItem('token', data);
  }

  getTokenDecoded(): any {
    const helper = new  JwtHelperService();
    const token = localStorage.getItem('token');
    const decodedToken = token ? helper.decodeToken(token) : null;
    return decodedToken;
  }

  removeLocalStorge(): void {
    localStorage.removeItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }


}
