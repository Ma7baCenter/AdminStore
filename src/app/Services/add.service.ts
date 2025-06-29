import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDto, ProductResponse } from '../Moduels/icatagory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  
 private apiUrl = 'https://ma7aba.bsite.net/api/Products'; // تأكد من صحة الرابط
 //private apiUrl = 'https://localhost:7201/api/Products'; // تأكد من صحة الرابط

  constructor(private http: HttpClient) { }

  createProduct(productData: CreateProductDto): Observable<ProductResponse> {
    const formData = new FormData();
    
    formData.append('Name', productData.Name);
    formData.append('Price', productData.Price.toString());
    if (productData.YoutubeLink) formData.append('YoutubeLink', productData.YoutubeLink);
    if (productData.Description) formData.append('Description', productData.Description);
    if (productData.Content) formData.append('Content', productData.Content);
   this.appendIfExists(formData, 'PriceBeforeDiscount', productData.PriceBeforeDiscount?.toString());

    // Handle dates properly
    if (productData.From) {
      formData.append('From', this.formatDate(productData.From));
    }
    if (productData.To) {
      formData.append('To', this.formatDate(productData.To));
    }

    formData.append('Category_Id', productData.Category_Id.toString());
    formData.append('Supplier_Id', (productData.Supplier_Id || 1).toString());
    
    // productData.Colors.forEach((color, index) => {
    //   formData.append(`Colors[${index}]`, color);
    // });
    
    productData.Images.forEach((image, index) => {
      formData.append(`Images`, image, image.name);
    });

    return this.http.post<ProductResponse>(this.apiUrl, formData);
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`);
  }


private appendIfExists(formData: FormData, key: string, value: any): void {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }

  private formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString();
  }


}