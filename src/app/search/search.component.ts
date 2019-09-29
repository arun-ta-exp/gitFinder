import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  username = '';
  user = {};
  clicked = false;
  isLoad = false;
  hasUser = true;
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
  }
  // getDetails() {
  //   return this.httpClient.get('https://api.github.com/users/' + this.username + '?access_token=e68d307beb720e60e7138165feb4dd453fcaa0b3').
  //     subscribe(res => { this.profile = res; console.log(res); }, err => {this.toastr.error('not a valid user'); });
  // }
  getDetails() {
    this.isLoad = true;
    if (localStorage.getItem(this.username)) {
      this.user = JSON.parse(localStorage.getItem(this.username));
      this.clicked = true;
      this.isLoad = false;
      this.hasUser = true;
      this.toastr.success('User found!', null, {
        timeOut: 3000,
        closeButton: true
      });
    } else {
      return this.httpClient.get(`https://api.github.com/users/${this.username}?access_token=b39870d5dd43d528238ecb71187dcc0371823b9c`)
        .subscribe((res) => {
          this.user = res;
          this.clicked = true;
          this.isLoad = false;
          this.hasUser = true;
          this.toastr.success('User found!', null, {
            timeOut: 3000,
            closeButton: true
          });
          localStorage.setItem(this.username, JSON.stringify(this.user));
        },
          err => {
            this.toastr.error('User not found!', null, {
              timeOut: 3000,
              closeButton: true
            });
            this.hasUser = false;
            this.isLoad = false;
            this.clicked = true;
          }
        );
    }
  }
}


