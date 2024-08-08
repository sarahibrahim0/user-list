import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  pageNum : BehaviorSubject<number> = new BehaviorSubject(0);
  perPage: BehaviorSubject<number> = new BehaviorSubject(0);
  total: BehaviorSubject<number> = new BehaviorSubject(0)
  totalPages: BehaviorSubject<number> = new BehaviorSubject(0)

  getUsers(page?: number): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users/${id}`);
  }
}
