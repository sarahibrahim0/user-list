import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UrlDataService {
  constructor() {}

  private paramsSource = new BehaviorSubject<string>('');
  currentParams = this.paramsSource.asObservable();

  changeParams(params: string) {
    this.paramsSource.next(params);
  }
}
