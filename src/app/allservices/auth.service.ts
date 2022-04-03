import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';
import { Employeedidnotreaddto } from '../interfaces/employeedidnotreaddto';
import { Employeereaddto } from '../interfaces/employeereaddto';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = environment.baseUrl + 'api/Authenticate/';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http : HttpClient) { }

  
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, password: string, fio: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      password,
      fio
    }, httpOptions);
  }

  registerAdmin(username: string, password: string, fio: string): Observable<any> {
    return this.http.post(AUTH_API + 'registerAdmin', {
      username,
      password,
      fio
    }, httpOptions);
  }

  resetPassword(username:string, newPassword:string): Observable<any> {
    return this.http.post(AUTH_API + 'resetpassword', {
      username,
      newPassword
    }, httpOptions);
  }

  getAllUsersForAdmin(): Observable<Employeereaddto[]> {  
    return this.http.get<Employee[]>(AUTH_API + 'getallemployeeforadmin')  
      .pipe(  
        catchError(this.handleError)  
      );  
  } 

  getAllUsersForUser(id : string): Observable<Employeedidnotreaddto[]> { 
    const url = `${AUTH_API + 'getallemployeeforuserwithmessages?id='}${id}`;  
    return this.http.get<Employeedidnotreaddto[]>(url)  
      .pipe(  
        catchError(this.handleError)  
      ); 
  } 

  readMessageFromUser(fromId: string, toId: string): Observable<any> {
    return this.http.post(AUTH_API + 'updatemessagesofuser', {
      fromId,
      toId
    }, httpOptions);
  }

  getSelectedUserById(id : string): Observable<Employeereaddto> { 
    const url = `${AUTH_API + 'getselecteduser?id='}${id}`;  
    return this.http.get<Employee>(url)  
      .pipe(  
        catchError(this.handleError)  
      ); 
  }

  deleteUser(id: string): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${AUTH_API + 'userdelete?id'}=${id}`;  
    return this.http.delete(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updateUser(emp: Employee): Observable<Employee> {  
    debugger  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${AUTH_API+'update'}/${emp.id}`;  
    return this.http.put<Employee>(url, emp, { headers: headers })  
      .pipe(  
        map(() => emp),  
        catchError(this.handleError)  
      );  
  }

  private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  

  private initializeUser(): Employee {  
    return {  
      id:'',
      username:'',
      password:'',
      fio:''
    };  
  } 

}

