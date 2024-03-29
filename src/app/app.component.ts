import { Component } from '@angular/core';
import {  Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'user-list';

  constructor(private router: Router ) {}

  url: string = "";

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.url
      });


  }
}
