import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as signalR from '@microsoft/signalr'; 
import { AuthService } from 'src/app/allservices/auth.service';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { Employeereaddto } from 'src/app/interfaces/employeereaddto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-chat-list',
  templateUrl: './user-chat-list.component.html',
  styleUrls: ['./user-chat-list.component.css']
})
export class UserChatListComponent implements OnInit {

  users : Employeereaddto[] = [];
  errorMessage : string = '';
 
  constructor(private router : Router,private userService:AuthService, private tokenStorage: TokenStorageService,) { }

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

   _str : string =this.tokenStorage.getUser().id;

  showInfo(str : string)
  {
    this._str = str;
    // this.router.navigate(['user-panel/chat'])
    // .then(nav=>{
    //   console.log(nav);
    // },err=>{
    //   console.log(err)
    // });
  }
}
