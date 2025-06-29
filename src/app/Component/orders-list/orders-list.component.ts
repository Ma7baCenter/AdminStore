import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {
orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://ma7aba.bsite.net/api/Order/AllOrdersForAdmin')
      .subscribe((data) => {
        this.orders = data;
      });
  }
}
