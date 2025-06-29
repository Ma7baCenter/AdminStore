import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-for-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-for-user.component.html',
  styleUrl: './orders-for-user.component.css'
})
export class OrdersForUserComponent implements OnInit {
  orders: any[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('orderDetails');
    if (data) {
      try {
        this.orders = JSON.parse(data).reverse(); // عكس الترتيب لعرض الأحدث أولاً
      } catch (e) {
        console.error('خطأ في قراءة البيانات من localStorage', e);
      }
    }
  }
}