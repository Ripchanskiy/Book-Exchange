import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TitleCasePipe } from '@angular/common'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user: any;

    constructor(private authService: AuthService,
                private titleCasePipe: TitleCasePipe) { }

    ngOnInit() {
        this.authService.getProfile().subscribe((profile: any) => {
            this.user = profile.user;
            this.user.name = this.titleCasePipe.transform(this.user.name);
        });
    }

}
