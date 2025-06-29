import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  lastValueFrom,
  map,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { Iproduct, Iproducts } from '../Moduels/iproduct';
import { Icatagory } from '../Moduels/icatagory';
import { Usertoken } from '../Moduels/usertoken';
import { Iuser } from '../Moduels/iuser';
import { Ilogin } from '../Moduels/ilogin';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LocalstorageService } from './localstorage.service';
import { IMessage } from '../Moduels/IMessage';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  //decodehoken:any|null;
  //hany:any;
  //responseRole?:string;
  reproll?: boolean;
  httpOption;

  responsedata: any;
  loginObj: Ilogin = {} as Ilogin;
  body: any;
  user = {} as Usertoken;
  islogged: boolean = false;

  CountSubject: BehaviorSubject<number>;
  private _Refresh = new Subject<void>();
  get Refresh() {
    return this._Refresh;
  }
  y: number = 0;
  // AddObj = {
  //   Id: 0,
  //   maount: 1,
  // };
  constructor(
    private httpclient: HttpClient,
    private router: Router,
    private loginservice: LoginService,
    private storageservice: LocalstorageService
  ) {
    //   if (localStorage.getItem('token') !==undefined && localStorage.getItem('token') !==null)
    // {const hany =   localStorage.getItem('token');}

    this.httpOption = {
      headers: new HttpHeaders({
       'Content-Type': 'application/json',
       // Authorization: `Bearer` + ' ' + this.storageservice.getToken(),
       'CompanyName' : 'garastest',
        'UserId' : 1 ,
        'UserToken':'Vbi5cD%2fLy5OAHIdiorY%2fZA%3d%3d',
      }),
    };

    this.CountSubject = new BehaviorSubject<number>(this.countcart);
  }
  ngOnInit(): void {}

  private handleError(error: HttpErrorResponse) {
    // Generic Error handler
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(() => new Error('Error occured, please try again'));
  }

  getall(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `https://jala44.bsite.net/api/Product/Index`
    );
  }
  // numberofpages(): Observable<Pager> {
  //   return this.httpclient.get<Pager>(
  //     `https://localhost:44380/api/Product/Num`
  //   );
  // }
  getallproofcat(Id: number): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `https://jala44.bsite.net/Product/productscatagorybyId/${Id} `
    );
  }
  getallcat(): Observable<Icatagory[]> {
    return this.httpclient.get<Icatagory[]>(
      'https://ma7aba.bsite.net/api/Cataegory/Index'
    );
  }
  getProductByID(prdID: number): Observable<Iproduct> {
    return this.httpclient.get<Iproduct>(
      `https://ma7aba.bsite.net/api/Product/Details/${prdID}`
    );
  }

// getProduct(prdID: number): Observable<Iproducts> {
//     return this.httpclient.get<Iproducts>(
//       `https://ma7aba.bsite.net/api/Product/Details/${prdID}`
//     );
//   }

  addProduct(newPrd: Iproduct): Observable<Iproduct> {
    return this.httpclient
      .post<Iproduct>(
        `https://ma7aba.bsite.net/api/Product/adding `,
        JSON.stringify(newPrd),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
 

  // addmessage(newmessage: IMessage): Observable<IMessage> {
  //   return this.httpclient
  //     .post<IMessage>(
  //       `https://localhost:44355/api/GreenAPI/UploadFormDataAsync`,
  //       newmessage,
  //       this.httpOption,
  //       //https://testcoreapi.garassolutions.com
  //     )
  //     .pipe(retry(2), catchError(this.handleError));
  // }

  updateProduct(prdID: number, UpdatedPrd: Iproduct): Observable<Iproduct> {
    return this.httpclient
      .put<Iproduct>(
        `https://ma7aba.bsite.net/api/Product/edite/${prdID} `,
        JSON.stringify(UpdatedPrd),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteProduct(prdID: number): Observable<any> {
    return this.httpclient
      .delete<any>(`https://ma7aba.bsite.net/api/Product/Delete/${prdID} `)
      .pipe(retry(2), catchError(this.handleError));
  }

 deletecat(prdID: number): Observable<any> {
    return this.httpclient
      .delete<any>(`https://ma7aba.bsite.net/api/Cataegory/Delete/${prdID} `)
      .pipe(retry(2), catchError(this.handleError));
  }



  Register(newuser: Iuser): Observable<Iuser> {
    return this.httpclient
      .post<Iuser>(
        `https://localhost:44380/api/Account/Registration`,
        JSON.stringify(newuser),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  onLogin(obj: any) {
    return this.httpclient
      .post('https://localhost:44380/api/Account/Login', obj, this.httpOption)
      .pipe(retry(2), catchError(this.handleError));
  }

  IsloggedIn() {
    //   if((localStorage.getItem('token'))!=null)
    //   return true;
    // else return false;
    //console.log(return localStorage.getItem('token') !=null)
    return false;
  }
  GetToken(): string | null {
    return localStorage.getItem('token');
  }

  // decodeToken(){
  // this.hany = localStorage.getItem('token')
  //  this.decodehoken =jwtDecode(this.hany);
  //   console.log(this.decodehoken);
  // }

  //  getuser(token:string):Usertoken|null
  // {
  //   const hany = this.GetToken();
  //   return JSON.parse(atob(token.split('.')[1])) as Usertoken
  // }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');

    alert('logout is succes');
    this.router.navigateByUrl('/home');
  }
  //  onLogin(obj:Ilogin ):any   {
  //   return this.httpclient.post("https://localhost:44380/api/Account/Login", obj,{observe:'response'})
  //   .pipe(tap(_=>this.log('user auth')),
  //   map( (res:HttpResponse<any>)=>{
  //     this.storageservice.saveId(res.body.userId);
  //     this.storageservice.saveuserRole(res.body.role);
  //     return res;
  //   }
  //   )
  //   )
  // }
  // log(message:string):void
  // {}

  // addToCart(Id: number): Observable<any> {
  //   debugger;
  //   return this.httpclient.post<any>(
    
  //     `https://localhost:44380/api/Cart/Additem?Product_Id=${Id}`, Id, this.httpOption
  //   );
  // }

  addToCart(Id: number): Observable<any> {
    debugger;
    return this.httpclient.post<any>(
    
      `https://jala44.bsite.net/api/Cart/Additem?Product_Id=${Id}`, Id
    );
  }



  getcounter(): Observable<number> {
    return this.httpclient.get<number>(
      `https://jala44.bsite.net/api/Cart/GetTotalItemInCart`,
      this.httpOption
    );
  }

  countcarttest() {
    this.getcounter().subscribe((xx: number) => {
      this.y = xx;
      return xx;
    });
  }
  get countcart(): number {
    this.countcarttest();
    return this.y;
  }
  // get countcart(): number {
  //   this.countcarttest();
  //   //console.log(this.y);
  //   return this.y;
  // }

  getCounterStatus(): Observable<number> {
    return this.CountSubject.asObservable();
  }
}
