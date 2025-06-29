import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Iproduct } from '../Moduels/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestApiService {
  httpOption;

  constructor( private httpclient: HttpClient,
    private storageservice: LocalstorageService)
   {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer` + ' ' + this.storageservice.getToken(),
        tenant:'m',
         langs :'ar'
      }),
    };
    }

    getall(): Observable<Iproduct[]> {
      return this.httpclient.get<Iproduct[]>(
        `https://localhost:44392/api/Product`,this.httpOption
      );
    }
}
