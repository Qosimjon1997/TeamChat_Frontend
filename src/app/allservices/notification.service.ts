import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';  
import { Notification } from 'src/app/interfaces/notification';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  
  private myUrl = environment.baseUrl + 'api/notification';

  constructor(private http: HttpClient) { }

  httpOptions = {  
    headers: new HttpHeaders({  
      'Content-Type': 'application/json'  
    })  
  }  

  getAllNotifications(): Observable<Notification[]> {  
    return this.http.get<Notification[]>(this.myUrl+'/getallnotifications')  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getNotification(id: string): Observable<Notification> {  
    if (id === '') {  
      return of(this.initializeNotification());  
    }  
    const url = `${this.myUrl}/${id}`;  
    return this.http.get<Notification>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  createNotification(employee: Notification): Observable<Notification> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<Notification>(this.myUrl, employee, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  deleteNotification(id: string): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.myUrl}/${id}`;  
    return this.http.delete<Notification>(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updateNotification(notific: Notification): Observable<Notification> {  
    debugger  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.myUrl}/${notific.id}`;  
    return this.http.put<Notification>(url, notific, { headers: headers })  
      .pipe(  
        map(() => notific),  
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
  
  private initializeNotification(): Notification {  
    return {  
      id:'',
      fromMessage:'',
      messageText:'',
      sentTime:''
    };  
  }  


}
