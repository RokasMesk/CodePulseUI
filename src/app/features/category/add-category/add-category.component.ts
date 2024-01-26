import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  private addCategorySubscription?:Subscription;

  model:AddCategoryRequest;
  constructor(private categoryService: CategoryService,
    private router: Router){
    this.model = {
      name:'',
      urlHandle:''
    }
  }

  onFormSubmit(){
    console.log(this.model);
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/categoriesList');
      }
    });
  }
  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
