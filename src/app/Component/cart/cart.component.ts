import { Component } from '@angular/core';
import { ProductsService } from '../../Services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../Services/order.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, ToastrModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(
    private service: ProductsService,
    private orderService: OrderService,
    private ser: CartService,
    private router: Router,
    private toastr: ToastrService,
    private location: Location
  ) {}
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;

  showPopup = false;

  orderData = {
    phone: '',
    email: '',
    notes: '',
    address: '',
    name: '',
  };
  order: any[] = [];

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cartProducts' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);
      // console.log(this.cartProducts);
    }
    this.getCartTotal();
  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }
  minsAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }
  detectChange() {
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    this.ser.updateCartCount();
  }

  clearCart() {
    this.cartProducts = [];
    this.getCartTotal();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  }
  clearALLCart() {
    this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);
    this.getCartTotal();
    localStorage.removeItem('cartProducts');
    this.ser.updateCartCount();
  }
  getCartTotal() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].price * this.cartProducts[x].quantity;
    }
  }

  openOrderPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  submitOrder() {
    const now = new Date();
    const cairoTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Africa/Cairo' })
    );
    const orderSummary = {
      phone: this.orderData.phone,
      email: this.orderData.email,
      notes: this.orderData.notes,
      address: this.orderData.address,
      name: this.orderData.name,
      orderDate: new Date().toLocaleString('ar-EG', {
        timeZone: 'Africa/Cairo',
        hour12: false,
      }),
     serial: `ORD-${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now
    .getDate()
    .toString()
    .padStart(2, '0')}-${now
    .getHours()
    .toString()
    .padStart(2, '0')}${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}${now
    .getSeconds()
    .toString()
    .padStart(2, '0')}${now.getMilliseconds()}`, 
      totalItems: this.cartProducts.length,
      totalQuantity: this.cartProducts.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      totalPrice: this.total,
      products: this.cartProducts.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
       // selectedColor: item.selectedColor,
      })),
    };

    if ('orderDetails' in localStorage) {
      this.order = JSON.parse(localStorage.getItem('orderDetails')!);
      if (!Array.isArray(this.order)) {
        this.order = [this.order];
      }
      this.order.push(orderSummary);
      localStorage.setItem('orderDetails', JSON.stringify(this.order));
    } else {
      localStorage.setItem('orderDetails', JSON.stringify(orderSummary));
    }

    this.orderService.sendOrder(orderSummary).subscribe(
      (res) => {
        // alert('تم إرسال الطلب بنجاح!');
        this.toastr.success('تم إرسال الطلب بنجاح!');

        this.success = true;
        this.showPopup = false;
        this.clearALLCart();
        this.ser.updateCartCount();
        this.router.navigate(['/products']);
      },
      (err) => {
        console.error('فشل في إرسال الطلب:', err);
        alert('حدث خطأ أثناء إرسال الطلب.');
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}
