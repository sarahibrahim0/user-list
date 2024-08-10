import { Component } from '@angular/core';
import {  Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from './store/user.reducer';
import { setCurrentPage } from './store/user.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'user-list';

  constructor(private router: Router ,
    private store :Store<{userState: UserState}>,
  private route: ActivatedRoute ) {

  }

  url: string = "";

  ngOnInit() {
 
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.url
      });


  }
}
