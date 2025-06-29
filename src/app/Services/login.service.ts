import { Injectable } from '@angular/core';
import { Ilogin } from '../Moduels/ilogin';
import { Usertoken } from '../Moduels/usertoken';
import { ProductsService } from './product.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { get } from 'http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  helper = new JwtHelperService();

  private subject = new BehaviorSubject('');
  country = new Subject();
  public common = this.subject.asObservable();
  logrole = new BehaviorSubject<string>('bbb');
  // inlogrole =this.logrole.asObservable();

  isloggedSubject: BehaviorSubject<boolean>;

  IsRoleSubject : BehaviorSubject<string>;
  constructor(private testservice: LocalstorageService ,private httpclient:HttpClient) {
    // global['localStorage'] = localStorage;
    this.isloggedSubject = new BehaviorSubject<boolean>(this.isUserLogged);
    this.IsRoleSubject = new BehaviorSubject<string>(this.isRoleLogged);
  }
  changelog(newlog: string) {
    this.logrole.next(newlog);
  }
  sent(data: any) {
    this.subject.next(data);
  }
  setCountry(ggg: any) {
    this.country.next(ggg);
  }

  //  get isUserLogged(): boolean
  //  {
  //   if (this.hany != null)
  //   return true;
  // else
  // return false;
  //  }
  get isUserLogged(): any {
    if (typeof localStorage !== 'undefined' &&(localStorage.getItem('token'))!=null) return true;
    else return false;
  }

  get isRoleLogged():any {
    if (typeof localStorage !== 'undefined') return (localStorage.getItem('role'));
   else  return '';
  }

  getloggedStatus(): Observable<boolean> {
    return this.isloggedSubject.asObservable();
  }
   getRoleStatus(): Observable<any>
   {
     return this.IsRoleSubject.asObservable();
   }
  inlogrole(): Observable<string> {
    return this.logrole.asObservable();
  }
 
  }

