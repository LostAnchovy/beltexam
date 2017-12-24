import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
user_name= this.user_name
question ={
  user_name: '',
  user_question:'',
  description:'',
  answer:'',
}

constructor(private _dataService: DataService, private _router:Router) { }


  ngOnInit() {
    this.user_name = sessionStorage.getItem('username');
  }  
  
  newQuestion() {
  this.user_name = sessionStorage.getItem('username');
  this.question.user_name = this.user_name;
  console.log(this.question);
  this._dataService.newQuestion(this.question);
  
  this.question={
    user_name: '',
    user_question:'',
    description:'',
    answer:'',
  };
  this._router.navigateByUrl('/dashboard');
  }
}
