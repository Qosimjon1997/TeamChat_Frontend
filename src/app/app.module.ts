import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { UserChatListComponent } from './components/user/chat/user-chat-list/user-chat-list.component';
import { ChatMessagesComponent } from './components/user/chat/chat-messages/chat-messages.component';
import { LoginComponent } from './login/login.component';
import { UserPanelComponent } from './components/user/user-panel/user-panel.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { AddRoomComponent } from './components/admin/add-room/add-room.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEmployeeComponent } from './components/admin/dialog-employee/dialog-employee.component';
import { MatMenuModule } from '@angular/material/menu';
import { DialogRoomComponent } from './components/admin/dialog-room/dialog-room.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsListComponent } from './components/user/notification/notifications-list/notifications-list.component';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { TestComponent } from './components/test/test.component';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    UserChatListComponent,
    ChatMessagesComponent,
    LoginComponent,
    UserPanelComponent,
    AdminPanelComponent,
    PageNotFoundComponent,
    AddEmployeeComponent,
    AddRoomComponent,
    DialogEmployeeComponent,
    DialogRoomComponent,
    NotificationsListComponent,
    TestComponent,
    UploadComponent,
    DownloadComponent,
    FileManagerComponent,
    PasswordChangeComponent
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
