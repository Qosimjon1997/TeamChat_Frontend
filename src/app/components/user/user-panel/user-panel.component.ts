import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { PasswordChangeComponent } from '../../password-change/password-change.component';


export interface User {
  name: string;
  }


  @Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  myControl = new FormControl();
   options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
   filteredOptions : Observable<User[]> | undefined;
   
  constructor(private router : Router, private dialog : MatDialog, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName!='User'){
      this.router.navigate(['/admin-panel'])
    }
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );

  }

  

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  btnNotications_click(){
   console.log("Notification button!");
  }

  btnVideoRoom_click(){
    console.log("Video Room button!");
  }

  btnMessages_click(){
    console.log("Messages button!");
  }

  btnExit(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  btnResetPassword_click(){
    this.dialog.open(PasswordChangeComponent, {
      width:'35%'
    });
  }


}
