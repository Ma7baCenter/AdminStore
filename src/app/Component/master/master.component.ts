import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../Moduels/iproduct';
import { Icatagory } from '../../Moduels/icatagory';
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [FormsModule, CommonModule, ToastrModule ,RouterLink],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
})
export class MasterComponent {
  productslist: any[] = [];
  y: number = 0;
  filterObj = {
    item: '',
    catagorgsId: 0,
    suppliersId: 0,
    pg: 1,
  };
  cartProducts: Iproduct[] = [];
  maount: number = 1;
 // selectedColor: string = '';
  quantity: number = 1;
  weight: number = 0;
  catfortest!: Icatagory;
  expandedProductId: number | null = null;

  catList: Icatagory[] = [];
  chooseCatID: number = 0;

  constructor(
    private httpclient: HttpClient,
    private router: Router,
    private loginservice: LoginService,
    private prdservices: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.filterProducts('');
  }
  onPrevious() {
    if (this.filterObj.pg > 1) {
      this.filterObj.pg--;
      this.filterProducts('');
    }
  }
  onNext() {
    this.filterObj.pg++;
    this.filterProducts('');
  }

  filterProducts(hany:any): void {
    this.filterObj.catagorgsId = this.chooseCatID;

    this.httpclient
      .get<Iproduct[]>(
        `https://ma7aba.bsite.net/api/Product/Num?catagorgsId=${this.filterObj.catagorgsId}&suppliersId=${this.filterObj.suppliersId}&pg=${this.filterObj.pg}&item=${this.filterObj.item}&t=${Date.now()}`
      )
      .subscribe({
        next: (res) => {
          this.productslist = res;
          console.log(this.productslist);
        },
        error: (err) => console.error('Failed to load products', err),
      });
  }
  loadCategories(): void {
    this.prdservices.getallcat().subscribe({
      next: (categories) => {
        this.catList = categories;
        // إضافة خيار "All Categories" إذا لم يكن موجوداً
        if (!this.catList.some((c) => c.cat_Id === 0)) {
          this.catList.unshift({ cat_Id: 0, namecat: 'كل المنتجات' ,img:"554.jpg"});
           this.catList.unshift({ cat_Id: 1000, namecat: ' العروض' ,img:"offer.png"});

        }
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }
  getSelCat(): void {
    this.filterObj.pg = 1; // إعادة تعيين الصفحة إلى 1
    this.filterProducts('');
  }
  addtocart(event: Iproduct) {
    const productWithColor: Iproduct = {
      ...event,
      //selectedColor: this.selectedColor,
      quantity: this.quantity,
     ...(event.flagWeight ? { weight: event.netWeight } : {})
    };

    // Load cart from localStorage if it exists
    if ('cartProducts' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);

      // Check for existence of the same product with same color
      const exist = this.cartProducts.find(
        (item) =>
          item.product_Id === productWithColor.product_Id 
        // &&
        //   item.selectedColor === productWithColor.selectedColor
      );

      if (exist) {
        //alert('هذا المنتج مضاف بالفعل في سلة المشتريات ');
                this.toastr.success(' المنتج مضاف بالفعل في سلة المشتريات ');

      } else {
        this.cartProducts.push(productWithColor);
        this.cartService.addToCart(productWithColor);
        this.toastr.success(' المنتج تم اضافته الي سلة المشتريات ');
        localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
      }
    } else {
      // First item being added to the cart
      this.cartProducts.push(productWithColor);
      this.toastr.success(' المنتج تم اضافته الي سلة المشتريات ');
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
      this.cartService.addToCart(productWithColor);
    }
  }

  // selectColor(color: string) {
  //   this.selectedColor = color;
  // }

  toggleDescription(id: number) {
    this.expandedProductId = this.expandedProductId === id ? null : id;
  }
}
