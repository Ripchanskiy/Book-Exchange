import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UploadService {

    constructor(private http: HttpClient) { }

    uploadAvatar(data) {
        return this.http.post('http://localhost:3000/api/users/upload', data);
    }

    uploadBookImage(data) {
        return this.http.post('http://localhost:3000/api/books/upload', data);
    }
}
