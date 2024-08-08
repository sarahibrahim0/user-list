import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../interfaces/user';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private route : ActivatedRoute
  ) {}
  filteredUsers: User[] = []


  ngOnInit() {

    this.route.queryParams.subscribe({
      next: (queryParams)=>{
        this.getUsers(queryParams['page']);

      }
    })

  }


  private getUsers(page) {
    this.userService.getUsers(page).subscribe(
      {
        next:(data)=>{

          this.userService.pageNum.next(data.page)
          this.userService.perPage.next(data.per_page);
          this.userService.total.next(data.total);
          this.userService.totalPages.next(data.total_pages);

          this.searchService.searchObservable$.subscribe(
            {
              next: (id)=>{
                  this.filteredUsers = id? data.data.filter((user) => user.id.toString() ===  id) : data.data;
              }
            }
          );
        }
      })

  }



}
