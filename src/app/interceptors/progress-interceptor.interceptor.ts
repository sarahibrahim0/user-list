import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UploadServiceService } from '../services/upload-service.service';

@Injectable()
export class progressInterceptorInterceptor implements HttpInterceptor {

  constructor(private progressBarService: UploadServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBarService.show();
    return next.handle(req)
    .pipe(

      finalize(() => {
        setTimeout(() => {
          this.progressBarService.hide()
        }, 900);
      })
    );
  }
}
