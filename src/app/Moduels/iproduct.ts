export interface Iproduct {
    product_Id:number;
    name:string;
    description:string;
    content:string;
    from:Date;
    to:Date;
    percent:number;
    priceBeforeDiscount:number;
    youtubeLink:string;
    price:number;
    quantity?:number;
    images?: string[];
    //colors?: string[];
    //file?:File;
    cat_Name?:string;
    sub_Name?:string;
    cat_Id?:number;
    sup_Id?:number;
   // selectedColor?: string   ;
}
export interface IProductImage {
  id: number;
  image: string;
}
export interface Iproducts {
    product_Id:number;
    name:string;
    description:string;
    content:string;
    from:Date;
    to:Date;
    percent:number;
    priceBeforeDiscount:number;
    youtubeLink:string;
    price:number;
    quantity?:number;
    images?: IProductImage[];
    //colors?: string[];
    //file?:File;
    cat_Name?:string;
    sub_Name?:string;
    cat_Id?:number;
    sup_Id?:number;
   // selectedColor?: string   ;
}