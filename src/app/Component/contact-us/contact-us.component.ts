import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
 facebookPage = 'https://www.facebook.com/profile.php?id=100084240951735&locale=ar_AR';
  phone = '01208383682';
  address = 'سيدي بشر بحري، ميامي، خليل حمادة، عمارة برج المعتز1';
  storeImage = 'assets/470579279_560672120078817_2858838386873230065_n.jpg'; // ← ضع صورتك هنا
  qrCodeImage = 'assets/WhatsApp Image 2025-06-19 at 1.35.04 AM.jpeg'; // ← QR كود للصفحة
}
