import { Component, Input } from '@angular/core';
import { UrlDataService } from '../../services/url-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bread-cramp',
  templateUrl: './bread-cramp.component.html',
  styleUrl: './bread-cramp.component.scss',
})
export class BreadCrampComponent {
  constructor(private urlService: UrlDataService, private activatedRoute : ActivatedRoute) {}

  page: string = '';
  @Input('url') url: string = '';
  id: string = '';
  qparams: string

  ngOnInit() {
    this.urlService.currentParams.subscribe((id) => {
      this.id = id;
    });

    // this.activatedRoute.queryParams.subscribe(qparams=>
    //   {
    //     this.qparams = "?page=" + qparams['page'] ;
    //   })

  }

}
