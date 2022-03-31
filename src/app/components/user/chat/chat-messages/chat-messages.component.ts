import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as signalR from '@microsoft/signalr'; 
import { AuthService } from 'src/app/allservices/auth.service';
import { MessageService } from 'src/app/allservices/message.service';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { UploaddownloadService } from 'src/app/allservices/uploaddownload.service';
import { Employeereaddto } from 'src/app/interfaces/employeereaddto';
import { Message } from 'src/app/interfaces/message';
import { MyFileName, ProgressStatus, ProgressStatusEnum } from 'src/app/interfaces/progress-status';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit, AfterViewChecked  {

  form: any = {
    messageText : null
  };
  _toUserId : string = this.tokenStorage.getUser().id;
  _myUser : string = this.tokenStorage.getUser().id;
  selectedUser !: Employeereaddto;
  get toUserId() : string{
    return this._toUserId;
  }
  @Input() set toUserId(value : string){
    this._toUserId = value;
    this.myfunction();
    this.getUserData(value);
    this.getData();
  }

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  
  allMessages : Message[] = [];
  errorMessage : string = '';

  public fileInDownload!: string ;
  public percentage!: number;
  public showProgress!: boolean;
  public showDownloadError!: boolean;
  public showUploadError!: boolean;
  
  public myfile1 : string = ''; 
  public myFileName : string = '';

  constructor(private service: UploaddownloadService, private snackBar: MatSnackBar, private tokenStorage : TokenStorageService, private authService : AuthService, private messageService : MessageService) {}

  ngOnInit(): void {
    this.getData();
    this.scrollToBottom();

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'chatHub')
      .build();

    connection.on("SendTextMessage", (_oneMessage : Message) => {
      this.getData();
    });

    connection.start().then(function () {
      console.log('My SignalR Connected!');
    }).catch(function (err) {
      return console.log(err.toString());
    });
    this.form.messageText = '';
  }

  myfunction():void{
    this.getData();
    this.scrollToBottom();

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'chatHub')
      .build();

    connection.on("SendTextMessage", (_oneMessage : Message) => {
      this.getData();
    });

    connection.start().then(function () {
      console.log('My SignalR Connected!');
    }).catch(function (err) {
      return console.log(err.toString());
    });
    this.form.messageText = '';
  }

  addFileDb(){
    this.service.getFilePath(this.myFileName).subscribe(
      data=>{
        const messageText  = this.myfile1;
        const fromMessage = this._myUser;
        const toMessage = this._toUserId;
        const isFile = true;
        const filePath = data[0]

        this.messageService.addMessage(fromMessage,toMessage,isFile,messageText,filePath).subscribe({
          next: data => {
            this.scrollToBottom();
            this.openSnackBar('File uploaded');
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.openSnackBar('Server connection error!');
          }
        });
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
        this.addFileDb();
        break;
      case ProgressStatusEnum.ERROR:
        this.showProgress = false;
        this.showUploadError = true;
        break;
    }
  }
  
  myfile(event: MyFileName){
    this.myfile1 = event.name;
    this.myFileName = event.myFilename;
  }


  getUserData(userId : string){
    this.authService.getSelectedUserById(userId).subscribe(
      data => {
        this.selectedUser = data;
      }
    )
  }

  getData(){
    this.messageService.getAllData(this.tokenStorage.getUser().id, this.toUserId).subscribe(
      allData => {
        this.allMessages = allData;
      },
      error => {
        this.errorMessage = <any>error;
        this.openSnackBar('Server connection error!');
      }
    );
  }

  sendMessage_click(){
    if(this.form.messageText != ''){
      const messageText  = this.form.messageText;
      const fromMessage = this._myUser;
      const toMessage = this._toUserId;
      const isFile = false;
      const filePath = '';
      
      this.messageService.addMessage(fromMessage,toMessage,isFile,messageText,filePath).subscribe({
        next: data => {
          this.form.messageText = '';
          this.scrollToBottom();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.openSnackBar('Server connection error!');
        }
      });
    }
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
