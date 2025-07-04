import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Iproduct, Iproducts } from '../../Moduels/iproduct';
import { CommonModule, CurrencyPipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  product!: Iproduct;
  expandedProductId: number | null = null;
  quantity: number = 1;
  cartProducts: Iproduct[] = [];
  weight: number = 0;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location,
    private cartService: CartService,
    private toastr: ToastrService
  
    
  ) {}

  ngOnInit(): void {
    // استخراج المعامل id من الرابط
    const prdID = Number(this.route.snapshot.paramMap.get('id'));
    //const prdID = +(this.route.snapshot.paramMap.get('id') || 0) ;
    console.log(prdID);
    // جلب بيانات المنتج حسب المعرّف
    this.productService.getProductByID(prdID).subscribe({
      next: (data) => (this.product = data),
      error: (err) => console.error('Error loading product', err),
    });
  }

  getSafeYoutubeLink(link: string): SafeResourceUrl {
    const embedUrl = link.includes('embed')
      ? link
      : `https://www.youtube.com/embed/${this.extractYoutubeId(link)}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractYoutubeId(url: string): string {
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?t=\d+)?/);
    return videoIdMatch ? videoIdMatch[1] : '';
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
      localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
     this.toastr.success(' المنتج تم اضافته الي سلة المشتريات ');
      this.cartService.addToCart(productWithColor);
    }
  }

  toggleDescription(id: number) {
    this.expandedProductId = this.expandedProductId === id ? null : id;
  }
  goBack(): void {
    this.location.back();
  }
}
