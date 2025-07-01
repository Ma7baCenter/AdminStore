import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../Services/product.service';
import { Iproduct } from '../../Moduels/iproduct';
import { CommonModule } from '@angular/common';
import { Icatagory } from '../../Moduels/icatagory';

@Component({
  selector: 'app-pagesproducts',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './pagesproducts.component.html',
  styleUrl: './pagesproducts.component.css'
})
export class PagesproductsComponent {
 productslist: any []= [];
  filterObj = {
    "item": "",
    "catagorgsId":0,
    "suppliersId": 0,
    "pg": 1,
  }

  catList: Icatagory[] = [];
  chooseCatID: number = 0;
  constructor(private httpclient:HttpClient , private prdService :ProductsService ,private router: Router )
  {

  }
  // ngOnChanges(): void {
  //   this.filetrCandidates('');
  // }
  ngOnInit(): void {
    this.loadCategories();
    this.filetrCandidates('');
    console.log(this.filterObj);
    console.log(this.productslist);
  }
  onPrevious() {
    if(this.filterObj.pg>1)
    {
      this.filterObj.pg --;
      this.filetrCandidates('');
    }
  
  }
  onNext() {
    this.filterObj.pg ++;
    this.filetrCandidates('');
  }

  filetrCandidates(hany:any) {
        this.filterObj.catagorgsId = this.chooseCatID;
    this.httpclient.get
    (`https://ma7aba.bsite.net/api/Product/Num?catagorgsId=${this.filterObj.catagorgsId}&suppliersId=${this.filterObj.suppliersId}
    &pg=${this.filterObj.pg}&item=${this.filterObj.item}`)
    .subscribe((res:any)=> {
      this.productslist = res;
      // console.log(this.filterObj);
      // console.log(this.productslist);
      // console.log(this.filterObj);


    })
  }


 loadCategories(): void {
    this.prdService.getallcat().subscribe({
      next: (categories) => {
        this.catList = categories;
        // إضافة خيار "All Categories" إذا لم يكن موجوداً
        if (!this.catList.some((c) => c.cat_Id === 0)) {
          this.catList.unshift({ cat_Id: 1000, namecat: ' العروض' ,img:"offer.png"});
          this.catList.unshift({ cat_Id: 0, namecat: 'كل المنتجات' ,img:"554.jpg"});

        }
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }

getSelCat(): void {
    this.filterObj.pg = 1; // إعادة تعيين الصفحة إلى 1
    this.filetrCandidates('');
  }

delete(id: number) {
  if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
    this.prdService.deleteProduct(id).subscribe({
      next: () => {
        alert("تم حذف المنتج بنجاح");
        this.filetrCandidates(''); // إعادة تحميل البيانات
      },
      error: (err: Error) => {
        alert("حدث خطأ أثناء الحذف: " + err.message);
        console.error(err);
      }
    });
  }
}



}
