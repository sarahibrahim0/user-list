import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';
import { select, Store } from '@ngrx/store';
import { UserState } from './../../store/user.reducer';
import { loadUsers, setCurrentPage } from '../../store/user.actions';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  private unsubscribe$ = new Subject<void>();

  constructor(
    private UserService: UserService,
    private store: Store<{ userStat: UserState }>,
    private router : Router
  ) {
 
  }

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
      setCurrentPage({
        currentPage: pageNum ,
      })
    );
    this.store.dispatch(
      loadUsers({ page: pageNum, postsPerPage: this.perPage })
    );
    this.router.navigate(['/users'], { queryParams: { page: this.page } });

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
    this.router.navigate(['/users'], { queryParams: { page: this.page } });

  }
}
