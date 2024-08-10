import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../../store/user.reducer';
import { loadUsers, setCurrentPage } from '../../../store/user.actions';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = []
  page: number;
  perPage: number;
  constructor(
    private searchService: SearchService,
    private UserService: UserService,
    private store: Store<{ userState: UserState }>,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {}
  filteredUsers: User[] = [];

  ngOnInit() {

      // Read the page parameter from the URL
      this.activatedRoute.queryParams.subscribe(params => {
        this.page = params['page'] ? +params['page'] : 1; // Default to page 1 if not present
        this.store.dispatch(loadUsers({
          page: this.page,
          postsPerPage: this.perPage
        }));
      });

      this.UserService.perPage.subscribe(perPage => this.perPage = perPage);

      this.UserService.pageNum.subscribe(currentPage => {
        this.page = currentPage;
        this.router.navigate(['/users'], {
          queryParams: {
            page: this.page,
          }
        });
      });

      this.UserService.users.subscribe(users => {
        this.searchService.searchObservable$.subscribe({
          next: (id) => {
            this.filteredUsers = id ? users.filter((user) => user.id.toString() === id) : users;
          },
        });
      });
    }
  }
