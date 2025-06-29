import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from './Moduels/IMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApimessagesService {
  private apiUrl = 'https://localhost:44355/api/GreenAPI/UploadFormDataAsync';
  constructor(private http: HttpClient) { }
  submitForm(formData: IMessage , userId :number = 1 ): Observable<any> {
      const data = new FormData();
      
      data.append('chatId', formData.chatId);
      data.append('caption', formData.caption);
      //data.append('fileName', formData.fileName );
      data.append('Name', formData.Name);
      //data.append('NameLab', formData.NameLab);
      if (formData.NameLab !== null) {
        data.append('NameLab', formData.NameLab.toString());
      }
     
      if (formData.fileName !== null) {
        data.append('fileName', formData.fileName.toString());
      }
      if (formData.Cost !== null) {
        data.append('Cost', formData.Cost.toString());
      }
      if (formData.file) {
        data.append('file', formData.file);
      }
      const headers = new HttpHeaders().set('UserId', userId.toString());
      console.log('Headers:', headers);
  
      return this.http.post(this.apiUrl, data , { headers: headers , withCredentials: true });
    }
}
