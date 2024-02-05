import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

export const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'blog/:url',
    component:BlogDetailsComponent
  },
 {
    path: 'categoriesList',
    component: CategoryListComponent
 },
 {
   path: 'admin/categories/add',
   component: AddCategoryComponent
 },
 {
  path: 'categoriesList/:id',
  component: EditCategoryComponent
 },
 {
  path: 'blogPostsList',
  component: BlogpostListComponent
 },
{ path: 'blogPostsList/add',
 component: AddBlogpostComponent
},
{
  path:'blogPostsList/:id',
  component:EditBlogpostComponent
}
 
];
