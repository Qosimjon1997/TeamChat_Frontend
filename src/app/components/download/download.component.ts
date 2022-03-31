import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploaddownloadService } from 'src/app/allservices/uploaddownload.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/interfaces/progress-status';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent{

  @Input() public disabled!: boolean;
  @Input() public fileName!: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private service: UploaddownloadService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  public download() {
    this.downloadStatus.emit( {status: ProgressStatusEnum.START});
    this.service.downloadFile(this.fileName).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage:data.loaded });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
            const downloadedFile = new Blob([data.body as BlobPart]);
            console.log(this.fileName);
            console.log(data);
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );
  }
}
