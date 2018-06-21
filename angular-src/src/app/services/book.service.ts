import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) { }

    getBooks() {
        return this.http.get('http://localhost:3000/api/books');
    }

    getBook(id) {
        return this.http.get('http://localhost:3000/api/books/' + id);
    }
}
