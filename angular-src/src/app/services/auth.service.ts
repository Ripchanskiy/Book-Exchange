import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authToken: any;
    user: any;

    constructor(private http: HttpClient) { }

    registerUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
        return this.http.post('http://localhost:3000/api/users/register', user, httpOptions);
    }

    authenticateUser(user) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        }
        return this.http.post('http://localhost:3000/api/users/authenticate', user, httpOptions);
    }

    getProfile() {
        this.loadToken();
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken })
        }
        return this.http.get('http://localhost:3000/api/users/profile', httpOptions);
    }

    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('test', 'test');
        this.authToken = token;
        this.user = user;
    }

    logOut() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}
