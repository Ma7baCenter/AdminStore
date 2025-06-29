import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartProducts';
  pass :number = 1 ;
  private cartCountSubject = new BehaviorSubject<number>(
    this.getCartItems().length
  );
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  getCartItems(): any[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  addToCart(product: any): void {
    const cart = this.getCartItems();
    if(this.pass == 1)
      {
        this.pass= this.pass + 1;
      }
      else
      {
        cart.push(product);

      }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartCountSubject.next(cart.length);
  }

  updateCartCount(): void {
  const cart = this.getCartItems();
  this.cartCountSubject.next(cart.length);
}
}
