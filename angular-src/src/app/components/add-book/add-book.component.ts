import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-book',
    templateUrl: './add-book.component.html',
    styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

    title: string;
    author: string;

    constructor(private bookService: BookService,
                private router: Router) { }

    ngOnInit() {

    }

    submitBook() {

        if((this.title != undefined && this.title != '') && (this.author != undefined && this.author != '')) {

            const book = {
                title: this.title,
                author: this.author
            }

            this.bookService.addBook(book).subscribe((data: any) => {
                if(data.success) {
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
