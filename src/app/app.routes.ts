import { Routes } from '@angular/router';
import { AddproductComponent } from './Component/addproduct/addproduct.component';
import { MasterComponent } from './Component/master/master.component';
import { CatagorylistComponent } from './Component/catagorylist/catagorylist.component';
import { EditComponent } from './Component/edit/edit.component';
import { CartComponent } from './Component/cart/cart.component';
import { AddingproductComponent } from './Component/addingproduct/addingproduct.component';
import { OrdersForUserComponent } from './Component/orders-for-user/orders-for-user.component';
import { ContactUsComponent } from './Component/contact-us/contact-us.component';
import { OrdersListComponent } from './Component/orders-list/orders-list.component';
import { UpdateProductComponent } from './Component/update-product/update-product.component';
import { PagesproductsComponent } from './Component/pagesproducts/pagesproducts.component';
import { AddcategoryComponent } from './Component/addcategory/addcategory.component';
import { UpdateCategoryComponent } from './Component/update-category/update-category.component';

export const routes: Routes = [
   // {path: '', redirectTo: '/products', pathMatch: 'full'},
    {path: 'add', component:AddproductComponent},
    {path: 'products', component:MasterComponent},
    {path: 'category', component:CatagorylistComponent},
    {path:"details/:id" , component:EditComponent},
    {path:"card" , component:CartComponent},
    {path:"adding" , component:AddingproductComponent},
    {path:"order" , component:OrdersForUserComponent},
    {path:"ContactUs" , component:ContactUsComponent},
    { path: 'orders', component: OrdersListComponent },
    { path: 'update/:id', component: UpdateProductComponent },
    { path: 'pages', component: PagesproductsComponent },
    { path: 'addcat', component: AddcategoryComponent },
    { path: 'updatecat/:id', component: UpdateCategoryComponent },

{ path: '', redirectTo: '/products', pathMatch: 'full' },
];
