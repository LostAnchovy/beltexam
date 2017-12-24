import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, Routes, RouterModule} from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user_name;

constructor(private router: Router, private _dataService: DataService) { }

  loginUser() {
    this._dataService.setUser(this.user_name);
    this.router.navigateByUrl('/dashboard');
  }
  ngOnInit() {
  }

}
