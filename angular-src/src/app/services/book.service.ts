import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    addBook(book) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http.post('http://localhost:3000/api/books/add', book, httpOptions);
    }
}
