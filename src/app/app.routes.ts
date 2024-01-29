import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';

export const routes: Routes = [
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
 }
];
