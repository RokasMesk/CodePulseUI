import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule,ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  routeSubscription?: Subscription;
  updateBlogPostSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  deleteBlogPostSubscription?:Subscription;
  imageSelectSubscription?:Subscription;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isImageSelectorVisible:boolean = false;

  constructor(private route : ActivatedRoute,
    private blogPostService:BlogPostService,
    private categoryService:CategoryService,
    private router:Router,
    private imageService:ImageService){

  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');
        if (this.id){
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) =>{
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
       this.imageSelectSubscription =  this.imageService.onSelectImage().
        subscribe({
          next: (response) =>{
            if (this.model){
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
      }
    })
  }
  onFormSubmit():void{
    // Convert this model to Request object
    if (this.model && this.id){
      var updateBlogPost:UpdateBlogPost={
        author:this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle:this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).
      subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/blogPostsList');
        }
      });
    }
  }
  onDelete():void{
    if (this.id){
      // service to delete blog post
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/blogPostsList');
        }
      })
    }
  }
  openImageSelector():void{
    this.isImageSelectorVisible = true;
  }
  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }

}
