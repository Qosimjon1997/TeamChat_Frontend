import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../allservices/auth.service';
import { TokenStorageService } from '../allservices/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private snackBar: MatSnackBar,private authService: AuthService, private tokenStorage: TokenStorageService, private router : Router) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roleName;
    }
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roleName;

        if(data.roleName == 'Admin'){
          this.router.navigate(['admin-panel'])
            .then(nav=>{
              
            },err=>{
              this.openSnackBar('Error!');
            });
        }
        else{
          this.router.navigate(['user-panel'])
            .then(nav=>{
              
            },err=>{
              this.openSnackBar('Error!');
            });
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.openSnackBar('Login or Password error!');
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
