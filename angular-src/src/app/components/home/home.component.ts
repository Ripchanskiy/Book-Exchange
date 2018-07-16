import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../../services/upload.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    message: string;
    selectedFile: File = null;
    user: Object;

    constructor(private http: HttpClient,
                private uploadService: UploadService,
                private auth: AuthService) { }

    ngOnInit() {
        this.user = this.auth.getUser();
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }     

    uploadImage() {
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.uploadService.uploadBookImage(fd).subscribe(res => {
            console.log('res:');
            console.log(res);
        });        
    }

    
}
