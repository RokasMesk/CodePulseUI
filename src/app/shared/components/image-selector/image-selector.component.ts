import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit, OnDestroy {
  private file?: File;
  fileName:string = '';
  title: string='';
  images$?:Observable<BlogImage[]>;
  @ViewChild('form', {static:false}) imageUploadFor?: NgForm;
  constructor(private imageService:ImageService){

  }

  ngOnInit(): void {
    this.getImages();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  onFileUploadChnage(event:Event):void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  uploadImage():void{
    if (this.file && this.fileName !== '' && this.title !== ''){
      // use image service to upload img
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) =>{
          this.imageUploadFor?.resetForm();
          this.getImages();
        }
      });
    }
  }
  selectImage(image:BlogImage):void{
    this.imageService.selectImage(image);
  }
  private getImages(){
    this.images$ = this.imageService.getAllImages();
  }
}
