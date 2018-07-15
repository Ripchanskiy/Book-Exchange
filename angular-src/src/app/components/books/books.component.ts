import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { categories } from '../../utils';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

    books: Object;
    categories: string[];

    constructor(private bookService: BookService) { }

    ngOnInit() {

        this.categories = categories;
        this.bookService.getBooks().subscribe(books => this.books = books);
        //this.bookService.getBooks().subscribe((books: any) => console.log(books[1].seller));
    }
}
