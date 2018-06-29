import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

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

    categories: string[];

    constructor(private bookService: BookService,
                private router: Router,
                private auth: AuthService) { }

    ngOnInit() {
        this.categories = categories;
    }

    submitBook() {

        if ((this.title != undefined && this.title != '') && (this.author != undefined && this.author != '')) {

            const book = {
                title: this.title,
                author: this.author,
                isbn: this.isbn,
                category: this.category,
                publisher: this.publisher,
                description: this.description,
                price: this.price,
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

}
