import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message = 'message';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${environment.serverUrl}/`).subscribe((data: any) => {
      this.message = data.message;
    });
  }

}
