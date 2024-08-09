import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute : ActivatedRoute
  ) {}
  filteredUsers: User[] = [];

  ngOnInit() {

    this.UserService.perPage.subscribe(perPage => this.perPage = perPage);
    this.UserService.pageNum.subscribe(page=> this.page = page);
    console.log(this.page + 'page')
    console.log(this.perPage)
    console.log(this.users)



      this.store.dispatch(
        loadUsers({ page: this.page, postsPerPage: this.perPage })
      );


    this.UserService.users.subscribe(users =>
    {
      this.searchService.searchObservable$.subscribe({
        next: (id) => {
          this.filteredUsers = id? users.filter((user) => user.id.toString() === id):users;
        },
      });
    }
    );



  }
}
