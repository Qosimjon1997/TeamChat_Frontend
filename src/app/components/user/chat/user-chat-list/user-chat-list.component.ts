import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr'; 
import { AuthService } from 'src/app/allservices/auth.service';
import { MessageService } from 'src/app/allservices/message.service';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { Employeedidnotreaddto } from 'src/app/interfaces/employeedidnotreaddto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-chat-list',
  templateUrl: './user-chat-list.component.html',
  styleUrls: ['./user-chat-list.component.css']
})
export class UserChatListComponent implements OnInit {

  users : Employeedidnotreaddto[] = [];
  errorMessage : string = '';
 
  constructor(private messageService : MessageService, private router : Router,private userService:AuthService, private tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    this.getUsersData();
    

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'chatHub')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.log(err.toString());
    });

    connection.on("AllUser", () => {
      this.getUsersData();
    })
  }

  getUsersData(){
    this.userService.getAllUsersForUser(this.tokenStorage.getUser().id).subscribe(
      allUsers => {
        this.users = allUsers;
      },
      error => this.errorMessage = <any>error
    );
  }

  readMessage(fromId:string, toId:string){
    this.userService.readMessageFromUser(fromId,toId).subscribe(
      answare => {
        console.log(answare);
      }
    )
  }

   _str : string =this.tokenStorage.getUser().id;
  showInfo(str : string)
  {
    this._str = str;
    console.log(str);
    console.log(this.tokenStorage.getUser().id);
    this.readMessage(str, this.tokenStorage.getUser().id);
  }
}
