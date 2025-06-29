import { Component, NgModule, OnInit } from '@angular/core';
import { Icatagory } from '../../Moduels/icatagory';
import { Iproduct } from '../../Moduels/iproduct';
import { ProductsService } from '../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common'
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule,JsonPipe,CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {
  catList: Icatagory[]=[];
  newPrd: Iproduct= {} as Iproduct;
  currentid:number=0;
  //selesctesimage: File | undefined;
  selesctesimage?:string;
  constructor(private prdService: ProductsService ,private router: Router 
   , private catservice:ProductsService ,private activeroute:ActivatedRoute) {
    this.currentid =Number(this.activeroute.snapshot.paramMap.get('pid'))
     }
  ngOnInit(): void {
    this.prdService.getallcat().subscribe(products=>{
    this.catList=products;
  });
  }
  addProduct() {
    const observer={
      next: (prd:Iproduct) => {
        alert("Product added Successfuly"); // not recommended
        // Use instead Toast (snackbar: https://material.angular.io/components/snack-bar/overview), BS Alert,...
        this.router.navigateByUrl('/home');
      },
      error: (err:Error)=>{alert(err.message)}
    }

    this.prdService.addProduct(this.newPrd).subscribe(observer);
  }
  upload(event:any)
  {    console.log(event.target.files[0].name);

     return (event.target.files[0].name);

    // console.log(event);
    // this.selesctesimage=(event.target.files[0].name);

    //console.log(event.target.file[0]);
  }
  uploaded(event:any)
  {
    
    this.selesctesimage=event.target.file;
    console.log(event);
    console.log(event.target.files[0]);
  }

}

