import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {
 id: string | null = null;
 category?:Category;
 paramsSubscription?: Subscription;
 editCategorySubscription?: Subscription;
  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router:Router){

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');
        if (this.id){
          // get the data from api
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next:(response) =>{
              this.category = response;
            }
          });

        }
      }
    });
  }
  onFormSubmit():void{
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '', 
      urlHandle: this.category?.urlHandle?? ''
    };
    if (this.id){
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next:(response) => {
          this.router.navigateByUrl('/categoriesList')
        }
      });
    }
    

  }
  onDelete():void{
    if (this.id){
      this.categoryService.deleteCategory(this.id).
      subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/categoriesList')
        }
      })
    }

  }
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
