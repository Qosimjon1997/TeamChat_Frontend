import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isPropertyAccessOrQualifiedName } from 'typescript';
import { Message } from '../interfaces/message';
import { Uniquemessageiddto } from '../interfaces/uniquemessageiddto';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = environment.baseUrl + 'api/Message/';

@Injectable({
  providedIn: 'root'
}) 
export class MessageService {

  constructor(private http : HttpClient) { }

  getAllData(fromId : string, toId : string): Observable<Message[]> {  
    return this.http.get<Message[]>(`${AUTH_API + 'getallmessagesfromusers?fromId='}${fromId}&toId=${toId}`)  
      .pipe(  
        catchError(this.handleError)  
      );  
  } 

  getAllDidNotReadData(toId : string): Observable<Message[]> {  
    return this.http.get<Message[]>(`${AUTH_API + 'getalldidnotread?toId='}${toId}`)  
      .pipe(  
        catchError(this.handleError)  
      );  
  } 

  getUniqueIdMessage(toId : string): Observable<Uniquemessageiddto[]> {  
    return this.http.get<Uniquemessageiddto[]>(`${AUTH_API + 'getalldidnotreadguid?toId='}${toId}`)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }

  addMessage(fromMessage : string, toMessage : string, isFile : boolean, messageText : string, isRead : boolean, filePath : string): Observable<any> {
    return this.http.post(AUTH_API + 'addmessage', {
      fromMessage,
      toMessage,
      isFile,
      messageText,
      filePath,
      isRead
    }, httpOptions);
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

  
  
}
