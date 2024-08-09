import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../../store/user.reducer';
import { loadUsers } from '../../../store/user.actions';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[];
  page: number;
  perPAge: number;
  constructor(
    private searchService: SearchService,
    private UserService: UserService,
    private store: Store<{ userState: UserState }>
  ) {}
  filteredUsers: User[] = [];

  ngOnInit() {


    this.store.dispatch(
      loadUsers({ page: this.page, postsPerPage: this.perPAge })
    );

    this.UserService.pageNum.subscribe(page => this.page = page);
    this.UserService.perPage.subscribe(perPage => this.perPAge = perPage);
    this.UserService.users.subscribe(users =>
    {
      this.searchService.searchObservable$.subscribe({
        next: (id) => {
          console.log(id);
          console.log(this.users + 'users');

          this.filteredUsers = id? users.filter((user) => user.id.toString() === id):users;
        },
      });
    }
    );



  }
}
