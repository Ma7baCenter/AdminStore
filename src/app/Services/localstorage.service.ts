import { Injectable } from '@angular/core';
import { Usertoken } from '../Moduels/usertoken';
import { Console } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  saveId(userId:any)
  {
    window.localStorage.removeItem(userId)
    window.localStorage.setItem('userId',userId)
  }
  saveuserRole(role:any)
  {
    window.localStorage.removeItem(role)
    window.localStorage.setItem('role',role)
  }
  getuserrole()
  {
    window.localStorage.getItem('role')

  }
   getuser():any
  {
    //const xx =localStorage.getItem('UserId');
    if (typeof localStorage !== 'undefined' &&(localStorage.getItem('userId'))!=null) 
    return (localStorage.getItem('userId'));
   else return '';
  }
  getuserId()
 {
  const user = this.getuser();
  if (user == null){return '';}
  console.log (user.userId);
  return user.UserId;
 }
 getToken():any
  {
    //const xx =localStorage.getItem('UserId');
    if (typeof localStorage !== 'undefined' &&(localStorage.getItem('userId'))!=null) 
    return (localStorage.getItem('token'));
   else return '';
  }
}
