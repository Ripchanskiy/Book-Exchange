import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    message: string;
    selectedFile: File = null;

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }    

    uploadImage() {
        console.log(this.selectedFile);
        const fd = new FormData();
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('http://localhost:3000/api/users/upload', fd).subscribe(res => {
            console.log('Res: ' + res);
        })
    }
}
