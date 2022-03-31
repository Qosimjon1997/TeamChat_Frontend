import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/allservices/token-storage.service';
import { PasswordChangeComponent } from '../../password-change/password-change.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  content?: string;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private dialog : MatDialog, private router : Router, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigate(['/login'])
    }
    else if(this.tokenStorageService.getUser().roleName!='Admin'){
      this.router.navigate(['/user-panel'])
    }
      
  }

  btnResetPassword_Click(){
    this.dialog.open(PasswordChangeComponent, {
      width:'35%'
    });
  }

  btnPersonClick()
  {
    this.router.navigate(['admin-panel/add-employee'])
    .then(nav=>{
      console.log(nav);
    },err=>{
      console.log(err)
    });
  }

  btnVideoClick()
  {
    this.router.navigate(['admin-panel/add-room'])
    .then(nav=>{
      console.log(nav);
    },err=>{
      console.log(err)
    });
  }

  btnExitClick()
  {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
