import { Console } from 'node:console';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../Moduels/iproduct';
import { ProductsService } from '../../Services/product.service';
import { from } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  product!: Iproduct;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  prdID: number = 0;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private productService: ProductsService,
        private location: Location ,
  ) {}

  ngOnInit() {
    this.prdID = Number(this.route.snapshot.paramMap.get('id'));
    
    // Initialize empty form first
    this.initializeForm();
    
    // Then load product data
    this.productService.getProductByID(this.prdID).subscribe({
      next: (data) => {
        this.product = data;
        console.log(this.product);
        this.patchFormValues();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product', err);
        this.isLoading = false;
      }
    });
  }

  initializeForm() {
    this.productForm = this.fb.group({
      product_Id: [''],
      name: [''],
      description: [''],
      price: [''],
      content :[''],
      from :[''],
      to :[''],
      priceBeforeDiscount :[''],
      youtubeLink :[''],
      cat_Id :[''],
      images: this.fb.array([])
    });
  }

  patchFormValues() {
    if (this.product) {
      this.productForm.patchValue({
        product_Id: this.product.product_Id,
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        cat_Id: this.product.cat_Id,
        content: this.product.content,
        priceBeforeDiscount: this.product.priceBeforeDiscount,
        youtubeLink: this.product.youtubeLink,
        from: this.product.from,
        to: this.product.to,
      });

      // Clear existing images
      while (this.images.length) {
        this.images.removeAt(0);
      }

      // Add product images to form
      if (this.product.images) {
        this.product.images.forEach(img => {
          this.images.push(this.fb.group({ image: img }));
          this.imagePreviews.push(img);
          console.log('Product Images:', this.product.images);
          console.log('Image Previews:', this.imagePreviews);

        });
      }
    }
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);
        this.images.push(this.fb.group({ image: file.name }));

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
    this.images.removeAt(index);
  }


  getImageSrc(path: string): string {
  // إذا كانت Base64 أو DataURL (للصور الجديدة)
  if (path.startsWith('data:image')) {
    return path;
  }
  // إذا كانت اسم صورة من السيرفر
  return `https://ma7aba.bsite.net/Images/${path}`;
}


  onSubmit() {
    if (this.productForm.invalid) {
      alert('Please fill all required fields');
      return;
    }
const formatNullable = (value: any, type: 'number' | 'date' = 'number') => {
  if (!value) return '';
  if (type === 'date') return new Date(value).toISOString();
  return value.toString();
};
   const formData = new FormData();

  const value = this.productForm.value;

  formData.append('product_Id', value.product_Id);
  formData.append('name', value.name);
  formData.append('description', value.description ?? '');
  formData.append('price', value.price.toString());
  formData.append('content', value.content ?? '');
  formData.append('from', formatNullable(value.from, 'date'));
  formData.append('to', formatNullable(value.to, 'date'));
  formData.append('priceBeforeDiscount', formatNullable(value.priceBeforeDiscount));
  formData.append('youtubeLink', value.youtubeLink ?? '');
  formData.append('cat_Id', value.cat_Id.toString());

  this.selectedFiles.forEach((file) => {
    formData.append('images', file);
  });

    // this.selectedFiles.forEach((file) => {
    //   formData.append('images', file);
    // });

console.log('Form values before sending:', this.productForm.value);
    this.http.post(`https://ma7aba.bsite.net/api/Product/UpdateProduct/${this.prdID}`, formData, {
    
    headers: {
      // لا تحدد Content-Type يدويًا لـ FormData، سيقوم Angular بتعيينه تلقائيًا مع boundary
    },


    reportProgress: true, // اختياري: لمتابعة تقدم الرفع
    responseType: 'json' // نوع الاستجابة المتوقع
  }).subscribe({
      next: () => alert('تم تحديث المنتج مع الصور'),
      error: err => console.error(err),
    });
  }


   goBack(): void {
    this.location.back();
  }
}