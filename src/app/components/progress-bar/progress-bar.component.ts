import { Component } from '@angular/core';
import { UploadServiceService } from '../../services/upload-service.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  isVisible : boolean = false;

  constructor(private progressBarService: UploadServiceService) {}

  ngOnInit() {
    this.progressBarService.progressBarVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }


}
