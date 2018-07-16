import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

    book: any;

    constructor(private bookService: BookService,
                private router: Router,
                private route: ActivatedRoute,
                private auth: AuthService) { }

    ngOnInit() {

        const id = this.route.snapshot.paramMap.get('id');
        this.bookService.getBook(id).subscribe(book => this.book = book);        
    }
    
    deleteBook(id) {
        this.bookService.deleteBook(id).subscribe((data: any) => {
            if(data.success) {
                this.router.navigate(['/books']);        
            } else { 
                console.log(data.message);
            }
        });
    }

    sameUser() {        
        if(this.auth.loggedIn() && (this.book.seller.id === this.auth.getUser().id)) {
            return true;
        } else {
            return false;
        }
    }

}
