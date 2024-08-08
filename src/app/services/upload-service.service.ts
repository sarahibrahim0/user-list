import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable  , BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  constructor(private http: HttpClient) {}


  private progressBarVisible = new BehaviorSubject<boolean>(false);
  progressBarVisible$ = this.progressBarVisible.asObservable();

  show() {
    this.progressBarVisible.next(true);
  }

  hide() {
    this.progressBarVisible.next(false);
  }


}
