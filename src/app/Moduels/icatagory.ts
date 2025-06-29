export interface Icatagory {
    cat_Id:number;
    namecat:string;
    img?:string;
}
export interface CreateProductDto {
  Name: string;
  Price: number;
  YoutubeLink?: string;
  Description?: string;
  Content?: string;
  Category_Id: number;
  Supplier_Id?: number;
   PriceBeforeDiscount?: number,
   From?: Date,
  To?: Date,
  Images: File[];
}

export interface ProductResponse {
  product_Id: number;
  name: string;
  price: number;
  youtubeLink?: string;
  description?: string;
  content?: string;
  category_Id: number;
  supplier_Id: number;
  colors: string[];
  imageUrls: string[];
}