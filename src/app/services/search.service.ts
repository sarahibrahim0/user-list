import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private searchSubject = new BehaviorSubject<string>(null);

  searchObservable$ = this.searchSubject.asObservable();

  search(term: string) {
    this.searchSubject.next(term);
  }
}
