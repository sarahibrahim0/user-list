import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from './../../services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {



  constructor(private searchService: SearchService){

  }
searchValue
  ngOnInit(){

  }
 onSearch(event){
  this.searchService.search(event.target.value);

 }


clearSearch(){
this.searchService.search(null)
this.searchValue = null
}
}
