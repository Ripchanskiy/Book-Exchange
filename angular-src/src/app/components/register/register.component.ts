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

    model: any = {};

    constructor(private validateService: ValidateService,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        
        const user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
        }

        // TODO: Update form to remove console.logs
        // Required Fields
        if(!this.validateService.validateRegister(user)) {
            console.log('Please fill in all fields');
            return false;
        }

        if(!this.validateService.validateEmail(user.email)) {
            console.log('Please enter a valid email address');
            return false;
        }

        // Register User
        this.authService.registerUser(user).subscribe((data: any) => {
            if(data.success) {
                this.router.navigate(['/login']);
            }
        });
    }
}
