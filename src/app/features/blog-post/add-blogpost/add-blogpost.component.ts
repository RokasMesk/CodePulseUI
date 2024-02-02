import { Component, OnInit, Pipe } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, DatePipe, MarkdownModule, CommonModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {
  model:AddBlogPost;
  categories$?: Observable<Category[]>
  constructor(private blogPostService: BlogPostService, private router:Router,
    private categoryService:CategoryService){
    this.model = {
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate:new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();
  }
  onFormSubmit():void{
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model).
    subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/blogPostsList')
      }
    })
  }
}
