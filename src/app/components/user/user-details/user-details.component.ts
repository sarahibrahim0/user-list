import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlDataService } from '../../../services/url-data.service';
import { UserService } from '../../../services/user.service';
import { filter } from 'rxjs';
import { User } from './../../../interfaces/user';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  constructor(private activatedRoute: ActivatedRoute , private urlService: UrlDataService , private userService: UserService){

  }

  user: User

  ngOnInit(){

    this.activatedRoute.params.subscribe((params)=>
     {
      if(params['id']){
        this.urlService.changeParams(params['id']);
        this.userService.getUserById(params['id']).subscribe(data=>this.user =data.data)
      }
    }
    )
  }

}
