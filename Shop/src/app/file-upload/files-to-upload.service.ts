import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileToUpload } from './file-to-upload';

@Injectable()
export class FilesToUploadService {
    private baseUrl:string='https://localhost:7242/api/Products';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
constructor(private http: HttpClient) { }
  
uploadFile(theFile: FileToUpload) : Observable<any> {
    return this.http.post<FileToUpload>(this.baseUrl, theFile, this.httpOptions);
}

}
