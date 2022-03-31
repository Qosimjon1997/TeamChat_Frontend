import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploaddownloadService {

  private apiDownloadUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;
  private apiFilePath: string;
  
  constructor(private httpClient: HttpClient) {
    this.apiDownloadUrl = environment.baseUrl + 'api/UploadDownload/download';
    this.apiUploadUrl = environment.baseUrl + 'api/UploadDownload/upload';
    this.apiFileUrl = environment.baseUrl + 'api/UploadDownload/files';
    this.apiFilePath = environment.baseUrl + 'api/UploadDownload/filepath';
  }

  public downloadFile(file: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }
  
  public uploadFile(file: Blob,namefile:string): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('file', file, namefile);
  
    return this.httpClient.request(new HttpRequest(
      'POST',
      this.apiUploadUrl,
      formData,
      {
        reportProgress: true
      }));
      
  }

  public getFiles(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiFileUrl);
  }


  public getFilePath(myfile: string): Observable<string[]> {
    const url = `${this.apiFilePath + '?myname='}${myfile}`; 
    return this.httpClient.get<string[]>(url);
  }

  // private handleError(err: { error: { message: any; }; status: any; body: { error: any; }; }) {  
  //   let errorMessage: string;  
  //   if (err.error instanceof ErrorEvent) {  
  //     errorMessage = `An error occurred: ${err.error.message}`;  
  //   } else {  
  //     errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
  //   }  
  //   console.error(err);  
  //   return throwError(errorMessage);  
  // }  
  
}
