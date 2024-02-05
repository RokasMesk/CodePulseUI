import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { Observable, Subscribable, Subscription, pipe } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, DatePipe, MarkdownModule, CommonModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model:AddBlogPost;
  imageSelectorSubscription?:Subscription;
  isImageSelectorVisible:boolean= false;
  categories$?: Observable<Category[]>
  constructor(private blogPostService: BlogPostService, private router:Router,
    private categoryService:CategoryService,
    private imageService:ImageService){
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
     this.imageSelectorSubscription = this.imageService.onSelectImage().
     subscribe({
      next:(selectedImage) =>{
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
     })
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
  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }
  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
