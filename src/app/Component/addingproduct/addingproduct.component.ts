import { Component } from '@angular/core';
import { AddService } from '../../Services/add.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Icatagory } from '../../Moduels/icatagory';
import { ProductsService } from '../../Services/product.service';

@Component({
  selector: 'app-addingproduct',
  standalone: true,
  imports: [FormsModule ,HttpClientModule ,CommonModule],
  templateUrl: './addingproduct.component.html',
  styleUrl: './addingproduct.component.css'
})
export class AddingproductComponent {
  product: any = {
    Name: '',
    Price: 0,
    YoutubeLink: '',
    Description: '',
    Content: '',
    Category_Id:1,
    Supplier_Id: 1,
    Images: [],
     PriceBeforeDiscount: 0,
    From: '',
    To: '',
  };
 selectedFiles: { file: File, preview: string }[] = [];
  maxFiles = 10; // Set maximum number of files allowed
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  newColor: string = '';
  //selectedFiles: File[] = [];
  catList: Icatagory[] = [];
  constructor(
    private productService: AddService,
    private router: Router,
   private prdservices: ProductsService,
    
  ) { }

  // addColor(): void {
  //   if (this.newColor && !this.product.Colors.includes(this.newColor)) {
  //     this.product.Colors.push(this.newColor);
  //     this.newColor = '';
  //   }
  // }

//   removeColor(color: string): void {
//   this.product.Colors = this.product.Colors.filter((c: string) => c !== color);
// }

  // onFileSelected(event: any): void {
  //   this.selectedFiles = Array.from(event.target.files);
  //   this.product.Images = this.selectedFiles;
  // }

ngOnInit(): void {
    this.loadCategories();
  }

 async onFileSelected(event: any): Promise<void> {
    const newFiles = Array.from(event.target.files) as File[];
    
    // Validate files
    const validFiles = newFiles.filter(file => {
      const isAcceptedType = this.acceptedTypes.includes(file.type);
      const isWithinSizeLimit = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isAcceptedType && isWithinSizeLimit;
    });

    // Generate previews for valid files
    const filesWithPreviews = await Promise.all(
      validFiles.map(async file => ({
        file,
        preview: await this.generatePreview(file)
      }))
    );

    // Combine with existing files (up to maxFiles limit)
    this.selectedFiles = [
      ...this.selectedFiles,
      ...filesWithPreviews.slice(0, this.maxFiles - this.selectedFiles.length)
    ];

    this.product.Images = this.selectedFiles.map(f => f.file);
  }

  private generatePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }



  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.product.Images = this.selectedFiles; 
  }

  onSubmit(): void {
    console.log(this.product);
    this.productService.createProduct(this.product).subscribe({
      next: (response) => {

        alert('Product added successfully!');
        this.router.navigate(['/master']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Please try again.');
      }
    });
  }

   loadCategories(): void {
    this.prdservices.getallcat().subscribe({
      next: (categories) => {
        this.catList = categories;
        // إضافة خيار "All Categories" إذا لم يكن موجوداً
        // if (!this.catList.some((c) => c.cat_Id === 0)) {
        //   this.catList.unshift({ cat_Id: 0, namecat: 'كل المنتجات' ,img:"554.jpg"});
        // }
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }
}