import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { UploadService } from '../../services/upload.service';
import { HttpEventType } from '@angular/common/http';

import { categories, conditions } from '../../utils';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

    title: string;
    author: string;
    isbn: string;
    category: string;
    publisher: string;
    condition: string;
    description: string;    
    price: string;
    postedOn: Date;
    seller: any;
    imagePath: string;

    selectedFile: File;
    uploading: boolean = false;

    message: string;

    categories: string[];
    conditions: string[];

    constructor(private bookService: BookService,
                private router: Router,
                private auth: AuthService,
                private uploadService: UploadService) { }

    ngOnInit() {
        this.categories = categories;
        this.conditions = conditions;
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        this.uploadImage();
    }

    // TODO: Update form validation
    submitBook() {

        if ((this.title && this.title != '') && 
            (this.author && this.author != '') && 
            (this.isbn && this.isbn != '') &&
            (this.category && this.category != '') &&
            (this.condition && this.condition != '') &&
            (this.imagePath && this.imagePath != '') &&
            (this.publisher && this.publisher != '') &&
            (this.description && this.description != '') &&
            (this.price && this.price != '')) {

            const book = {
                title: this.title,
                author: this.author,
                isbn: this.isbn,
                category: this.category,
                publisher: this.publisher,
                condition: this.condition,
                description: this.description,
                price: this.price,
                imagePath: this.imagePath,
                postedOn: new Date().getDate(),
                seller: this.auth.getUser()
            }
                        
            this.bookService.addBook(book).subscribe((data: any) => {
                if (data.success) {
                    this.router.navigate(['/books']);
                } else {
                    console.log(data.message);
                }
            });
        } else {
            this.message = 'Please fill in all fields';
        }
    }
    
    uploadImage() {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.uploadService.uploadBookImage(fd).subscribe((event: any) => {
            if(event.type === HttpEventType.UploadProgress) {
                console.log('Upload Progess:' + Math.round(event.loaded / event.total * 100) + '%');
                this.uploading = true;
            } else if (event.type === HttpEventType.Response) {
                this.imagePath = 'http://localhost:3000' + event.body.path.replace('public', '');
                this.uploading = false;               
            }
        });        
    }

}
