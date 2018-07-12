import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { UploadService } from '../../services/upload.service';

import { categories } from '../../categories';

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
    description: string;    
    price: string;
    postedOn: Date;
    seller: any;
    imagePath: string;

    selectedFile: File;

    categories: string[];

    constructor(private bookService: BookService,
                private router: Router,
                private auth: AuthService,
                private uploadService: UploadService) { }

    ngOnInit() {
        this.categories = categories;
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }     

    // TODO: Update form validation
    submitBook() {

        this.uploadImage();

        if ((this.title != undefined && this.title != '') && (this.author != undefined && this.author != '')) {

            const book = {
                title: this.title,
                author: this.author,
                isbn: this.isbn,
                category: this.category,
                publisher: this.publisher,
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
            console.log('Please fill in all fields');
        }
    }

    uploadImage() {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.uploadService.uploadBookImage(fd).subscribe((res: any) => {
            this.imagePath = 'http://localhost:3000' + res.path.replace('public', '');
            console.log(this.imagePath)
        });        
    }

}
