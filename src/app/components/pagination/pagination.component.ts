import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  constructor(private router: Router , private UserService : UserService){}



 page : number;
 perPage : number;
 users : number;
 totalPages : number;

ngOnInit(){
  this.UserService.pageNum.subscribe(page=>{

    this.page = page
  });

  this.UserService.perPage.subscribe(perPage=>{

    this.perPage = perPage
  });
  this.UserService.totalPages.subscribe(pages=>{

    this.totalPages = pages
  });

  this.UserService.total.subscribe(users=>{

    this.users = users
  });


}

  getPage(pageNum : number) {
    this.UserService.pageNum.next(pageNum);
    this.router.navigate(['/users'], { queryParams: { page:  this.page } });
  }

  onButtonClick(number: number) {
    if (number === -1 && this.page !== 1) {
      this.page = this.page + number;

    } else if (number === 1 && this.page < this.totalPages) {
      this.page = this.page + number;
    }

    this.router.navigate(['/users'], { queryParams: { page:  this.page } });

  }
}
