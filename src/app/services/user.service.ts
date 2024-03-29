import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`);
  }
}
