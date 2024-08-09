import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  pageNum: BehaviorSubject<number> = new BehaviorSubject(0);
  perPage: BehaviorSubject<number> = new BehaviorSubject(0);
  total: BehaviorSubject<number> = new BehaviorSubject(0);
  totalPages: BehaviorSubject<number> = new BehaviorSubject(0);
  users: BehaviorSubject<User[]> = new BehaviorSubject([]);


  constructor(private http: HttpClient , private store : Store<{userState: UserState}>) {
  this.store.select(store=>store.userState.currentPage).subscribe(page=>{
    console.log(page)
    this.pageNum.next(page);
  });

  this.store.select(store=>store.userState.postsPerPage).subscribe(perPage=>{
    console.log(perPage)

    this.perPage.next(perPage);
  });

  this.store.select(store=>store.userState.totalPages).subscribe(pages=>{
    console.log(pages)

    this.totalPages.next(pages);
  });

  this.store.select(store=>store.userState.totalPosts).subscribe(posts=>{
    console.log(posts)

    this.total.next(posts);
  });

  this.store.select(store=>store.userState.users).subscribe(users=>{
    console.log(users)

    this.users.next(users);
  });
  }



  getUsers(page?: number): Observable<any> {
    return this.http.get<any>(`https://reqres.in/api/users?page=${page}`);
  }

  getUserById(id: string): Observable<any> {
    console.log(id);
    return this.http.get<any>(`https://reqres.in/api/users/${id}`);
  }
}
