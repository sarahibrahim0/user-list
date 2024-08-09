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
  // constructor(
  //   private userService: UserService,
  //   private route : ActivatedRoute
  // ) {}

  users$: Observable<User[]>;
  page$ : Observable<number>
  page: number
  constructor(
    private searchService: SearchService,
    private store: Store<{ userState: UserState }>
  ) {
    this.users$ = store.select((state) => state.userState.users);
   this.page$ = store.select((state)=> state.userState.currentPage)

  }
  filteredUsers: User[] = [];

  ngOnInit() {
    this.page$.subscribe(page=>{
      this.page = page
    })
    this.store.dispatch(loadUsers({page: this.page , postsPerPage: 6}));
    this.users$.subscribe((users) => {
      this.searchService.searchObservable$.subscribe({
        next: (id) => {
          this.filteredUsers = id
            ? users.filter((user) => user.id.toString() === id)
            : users;
        },
      });
    });
  }


}
