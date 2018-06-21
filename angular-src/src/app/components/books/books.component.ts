import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

    books: Object;

    constructor(private bookService: BookService) { }

    ngOnInit() {

        this.bookService.getBooks().subscribe(books => this.books = books);
    }



}
