import { Component } from '@angular/core';
import { ProductsService } from '../../Services/product.service';
import { Icatagory } from '../../Moduels/icatagory';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catagorylist',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './catagorylist.component.html',
  styleUrl: './catagorylist.component.css'
})
export class CatagorylistComponent {
  catagorylist:Icatagory[]=[];
  currentid:number=0
  Image:any;
  constructor(private prdService :ProductsService ) 
  {
   
  }
  ngOnInit(): void {
   
    this.gettest();
}
gettest()
{      

  this.prdService.getallcat()
  
  .subscribe((res:any)=>{
    res.forEach((x:any) => {
      this.catagorylist.push(x);


    });
  })
}
delete(id: number) {
  if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
    this.prdService.deletecat(id).subscribe({
      next: () => {
        alert("تم حذف المنتج بنجاح");
        this.gettest(); // إعادة تحميل البيانات
      },
      error: (err: Error) => {
        alert("حدث خطأ أثناء الحذف: " + err.message);
        console.error(err);
      }
    });
  }
}

}
