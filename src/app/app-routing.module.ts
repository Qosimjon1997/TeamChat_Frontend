import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { AddRoomComponent } from './components/admin/add-room/add-room.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserPanelComponent } from './components/user/user-panel/user-panel.component';
import { ChatMessagesComponent } from './components/user/chat/chat-messages/chat-messages.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {path : '', redirectTo:'login',pathMatch:'full'},
  {path : 'login', component:LoginComponent},
  {path : 'test', component:TestComponent},
  {path : 'user-panel', component:UserPanelComponent,
    children : [
      {path : 'chat', component:ChatMessagesComponent}
    ]
  },
  {path : 'admin-panel', component:AdminPanelComponent,
    children : [
      {path : 'add-employee', component:AddEmployeeComponent},
      {path : 'add-room', component:AddRoomComponent}
    ]  
  },
  {path : '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
