import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name: string;
    username: string;
    email: string;
    password: string;

    message: string;

    model: any = {};

    constructor(private validateService: ValidateService,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
    }

    onRegisterSubmit() {

        if (!this.name || this.name == '') {
            this.message = 'Please enter your name.'
        } else if (!this.username || this.username == '') {
            this.message = 'Please enter your username.'
        } else if (!this.validateService.validateEmail(this.email)) {
            this.message = 'Please enter a valid email'
        } else if (!this.validateService.validatePassword(this.password)) {
            this.message = 'That is not a valid password'
        } else {

            const user = {
                name: this.name.toLowerCase(),
                username: this.username.toLowerCase(),
                email: this.email.toLowerCase(),
                password: this.password
            }

            // Register User
            this.authService.registerUser(user).subscribe((data: any) => {
                if (data.success) {
                    this.router.navigate(['/login']);
                } else {
                    this.message = data.message;
                }
            });
        }
    }
}
