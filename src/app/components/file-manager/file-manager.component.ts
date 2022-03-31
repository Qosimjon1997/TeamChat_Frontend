import { Component, OnInit } from '@angular/core';
import { UploaddownloadService } from 'src/app/allservices/uploaddownload.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/interfaces/progress-status';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  public files!: string[] ;
  public fileInDownload!: string ;
  public percentage!: number;
  public showProgress!: boolean;
  public showDownloadError!: boolean;
  public showUploadError!: boolean;

  constructor(private service: UploaddownloadService) { }

  ngOnInit() {
    this.getFiles();
  }

  private getFiles() {
    this.service.getFiles().subscribe(
      data => {
        this.files = data;
      }
    );
  }

  public downloadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showDownloadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        //this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showDownloadError = true;
        break;
    }
  }

  public uploadStatus(event: ProgressStatus) {
    switch (event.status) {
      case ProgressStatusEnum.START:
        this.showUploadError = false;
        break;
      case ProgressStatusEnum.IN_PROGRESS:
        this.showProgress = true;
        //this.percentage = event.percentage;
        break;
      case ProgressStatusEnum.COMPLETE:
        this.showProgress = false;
        this.getFiles();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }

}
