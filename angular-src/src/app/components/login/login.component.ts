import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    message: string;

    constructor(private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
    }

    onLoginSubmit() {
        if (!this.username || this.username == '') {
            this.message = 'Please enter your username.'
        } else if (!this.password || this.password == '') {
            this.message = 'Please enter your password.'
        } else {
            const user = {
                username: this.username.toLowerCase(),
                password: this.password
            }

            this.authService.authenticateUser(user).subscribe((data: any) => {
                if (data.success) {
                    this.authService.storeUserData(data.token, data.user);
                    this.router.navigate(['/profile']);
                } else {
                    this.message = data.message;
                }
            });
        }
    }

}
