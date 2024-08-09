import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Store } from '@ngrx/store';
import { UserState } from './../../store/user.reducer';
import { loadUsers, setCurrentPage } from '../../store/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  constructor(
    private UserService: UserService,
    private store: Store<{ userStat: UserState }>,
    private router : Router
  ) {}

  page: number;
  perPage: number;
  users: number;
  totalPages: number;

  ngOnInit() {
    this.UserService.pageNum.subscribe((page) => {
      this.page = page;
    });

    this.UserService.perPage.subscribe((perPage) => {
      this.perPage = perPage;
    });
    this.UserService.totalPages.subscribe((pages) => {
      this.totalPages = pages;
    });

    this.UserService.total.subscribe((users) => {
      this.users = users;
    });
  }

  getPage(pageNum: number) {
    this.store.dispatch(
      loadUsers({ page: pageNum, postsPerPage: this.perPage })
    );
  }

  onButtonClick(number: number) {
    if (number === -1 && this.page !== 1) {
      this.page -= 1;
      this.store.dispatch(
        setCurrentPage({
          currentPage: this.page ,
        })
      );

      this.store.dispatch(
        loadUsers({ page: this.page , postsPerPage: this.perPage })
      );
    } else if (number === 1 && this.page < this.totalPages) {
      this.page += 1;
      this.store.dispatch(
        setCurrentPage({
          currentPage: this.page ,
        })
      );

      this.store.dispatch(

        loadUsers({ page: this.page, postsPerPage: this.perPage })
      );

    }
    this.router.navigate(['/'], { queryParams: { page: this.page } });

  }
}
