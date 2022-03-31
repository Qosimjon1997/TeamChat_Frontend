import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/allservices/notification.service';
import { Notification } from 'src/app/interfaces/notification';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  notifications : Notification[] = [];
  errorMessage : string = '';

  constructor(private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.getNotificationsData();

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + 'chatHub')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.log(err.toString());
    });

    connection.on("AllNotificationMessages", () => {
      this.getNotificationsData();
    })

  }

  getNotificationsData(){
    this.notificationService.getAllNotifications().subscribe(
      allNotifications => {
        this.notifications = allNotifications
      },
      error => this.errorMessage = <any>error
    );
  }

  _str : string ="";
  lists: string[]=["user1","user2","user3","user4","user5","user6","user7"];

  showInfo(str : string)
  {
    console.log(str);
    this._str = str;
  }


}
