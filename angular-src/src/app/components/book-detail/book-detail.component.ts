import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

    book: Object;

    constructor(private bookService: BookService,
                private route: ActivatedRoute) { }

    ngOnInit() {

        const id = this.route.snapshot.paramMap.get('id');
        this.bookService.getBook(id).subscribe(book => this.book = book);        
    }

    logBook() {
        console.log(this.book);
    }

}
