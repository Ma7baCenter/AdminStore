import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  categoryId!: number;
  Namecat: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router ,
    private location: Location ,

  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategory();
  }

  loadCategory(): void {
    this.http.get<any>(`https://ma7aba.bsite.net/api/Cataegory/getbyid/${this.categoryId}`)
      .subscribe({
        next: (data) => {
          this.Namecat = data.namecat;
          this.previewUrl = `https://ma7aba.bsite.net/Category/${data.img}`;
        },
        error: (err) => {
          console.error('Failed to load category', err);
        }
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  updateCategory(): void {
    const formData = new FormData();
    formData.append('name', this.Namecat);

    if (this.selectedFile) {
      formData.append('files', this.selectedFile); // ASP.NET will look in Request.Form.Files
    }

    this.http.post(`https://ma7aba.bsite.net/api/Cataegory/UpdateCategory/${this.categoryId}`, formData)
      .subscribe({
        next: () => {
          alert('Category updated successfully');
          this.router.navigate(['/categories']); // or wherever your list is
        },
        error: (err) => {
          console.error('Error updating category:', err);
          alert('Error updating category');
        }
      });
  }
   goBack(): void {
    this.location.back();
  }
}
