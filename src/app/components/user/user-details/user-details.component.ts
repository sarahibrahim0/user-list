import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlDataService } from '../../../services/url-data.service';
import { UserService } from '../../../services/user.service';
import { filter, Observable } from 'rxjs';
import { User } from './../../../interfaces/user';
import { Store } from '@ngrx/store';
import { UserState } from './../../../store/user.reducer';
import { loadUser } from '../../../store/user.actions';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  user$: Observable<User>

  constructor(private activatedRoute: ActivatedRoute , private urlService: UrlDataService , private userService: UserService,
    private store : Store<{ userState: UserState }>
  ){

    this.user$ = store.select(state => state.userState.user);

  }



  ngOnInit(){


    this.activatedRoute.params.subscribe((params)=>
     {
      if(params['id']){
        this.store.dispatch(loadUser({userId :params['id']}));

      }
    }
    )



  }

}
