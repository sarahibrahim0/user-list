import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  constructor(private router: Router){}

  page: number = 1;

  ngOnInit() {
  }

  getPage(page) {
    console.log(page)
    this.page = page;
    this.router.navigate(['/users'], { queryParams: { page:  this.page } });

  }

  onButtonClick(number: number) {
    if (number === -1 && this.page !== 1) {
      this.page = this.page + number;

    } else if (number === 1 && this.page < 2) {
      this.page = this.page + number;
    }

    this.router.navigate(['/users'], { queryParams: { page:  this.page } });

  }
}
