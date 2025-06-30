import { Console } from 'node:console';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddService } from '../../Services/add.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [FormsModule ,HttpClientModule ,CommonModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent {
category: any = {
    Namecat: ''
   
  };
 selectedFiles: { file: File, preview: string }[] = [];
  maxFiles = 10; // Set maximum number of files allowed
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  newColor: string = '';
  //selectedFiles: File[] = [];
  constructor(
    private productService: AddService,
    private router: Router
    
  ) { }

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

    this.category.Image = this.selectedFiles.map(f => f.file);
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
    this.category.Image = this.selectedFiles; 
  }

  onSubmit(): void {
    console.log(this.category);
    this.productService.createcat(this.category).subscribe({
      
      next: (response) => {

        alert('Product added successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Please try again.');
      }
    });
  }

}
