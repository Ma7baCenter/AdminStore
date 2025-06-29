import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { ProductsService } from '../../Services/product.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalstorageService } from '../../Services/localstorage.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnChanges {
  islogged: boolean;
  isRole: string;
  //  iislogged :boolean;
  testCounter: number = 0;
  countcart: any;
  cartCount:number = 0;

  helper = new JwtHelperService();
  constructor(
    private loginservice: LoginService,
    private prdservice: ProductsService,
    private storgeservice: LocalstorageService,
    private cartService: CartService 
  ) {
    this.islogged = this.loginservice.isUserLogged;

    this.isRole = this.loginservice.isRoleLogged;
    this.countcart = this.prdservice.countcart;

    this.prdservice.getcounter().subscribe((x) => {
      this.testCounter = x;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.loginservice.inlogrole().subscribe(m=>{this.isRole=m});
  }
  ngOnInit(): void {

    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    //this.loginservice.getloggedStatus().subscribe(m=>{this.iislogged=m})
    this.loginservice.getloggedStatus().subscribe((m) => {
      this.islogged = m;
    });

    //   if (localStorage.getItem('token') !=null)
    //   {this.islogged=true;}
    //  else  {this.loginservice.getloggedStatus().subscribe(m=>{this.islogged=m})};

    this.loginservice.getRoleStatus().subscribe((m) => {
      this.isRole = m;
    });
    //console.log(this.isRole);

    //  this.prdservice.getCounterStatus().subscribe(x=>{
    //   this.countcart=x ;
    //   console.log(this.countcart)
    //  })

    // this.prdservice.getCounterStatus().subscribe(x =>
    //   {
    //     this.countcart=x;

    //   });

    this.prdservice.Refresh.subscribe((res) => {
      this.prdservice.getcounter().subscribe((x) => {
        this.testCounter = x;
      });
    });

    //this.loginservice.setCountry('Admin');
    // this.loginservice.country.subscribe(m=>{this.islogged=m})
    //  this.loginservice.log.subscribe(
    //   m=>{this.islogged =m;
    // })
    // this.loginservice.common.subscribe(
    //   m=>{this.islogged =m;
    // })
    //console.log(this.islogged);
    // const hhh= this.helper.decodeToken(jjj);
    // this.islogged= hhh.role;
  }
  loggout() {
    //this.loginservice.setCountry('Admin');
    this.prdservice.logout();
    this.loginservice.isloggedSubject.next(false);
    this.loginservice.IsRoleSubject.next('');

  }
}
