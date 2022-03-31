import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { MessageService } from 'src/app/allservices/message.service';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { Message } from 'src/app/interfaces/message';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private tokenStorage : TokenStorageService, private messageService : MessageService) { }

  allMessages : Message[] = [];
  errorMessage : string = '';

  ngOnInit(): void {
    // this.getData();

    // const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Information)
    //   .withUrl(environment.baseUrl + 'chatHub')
    //   .build();

    // connection.on("SendTextMessage", (_oneMessage : Message) => {
    //   this.getData();
    //   console.log("My Text was " + _oneMessage);
    // });

    // connection.start().then(function () {
    //   console.log('My SignalR Connected!');
    // }).catch(function (err) {
    //   return console.log(err.toString());
    // });

    

  }

  // getData(){
  //   this.messageService.getAllData(this.tokenStorage.getUser().id, 'eb18b3b6-457e-46dc-9221-4f2d9519791c').subscribe(
  //     allData => {
  //       console.log("Mydata: " + allData);
  //       this.allMessages = allData
  //     },
  //     error => {
  //       this.errorMessage = <any>error;
  //       console.log("My Error: " + this.errorMessage);
  //     }
  //   );
  // }

}
