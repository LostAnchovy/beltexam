import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  user_name = sessionStorage.getItem('username');
  question;
  id;
  answer ={
    user_name: '',
    user_answer:'',
    details:'',
    like:0
  }

  constructor(private _dataService: DataService,private _router: Router, private _route:ActivatedRoute) { 
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this._dataService.getThisQuestion(this.id, (question) => {
        this.question = question;
      })
    })

  }

  ngOnInit() {
    this.user_name = sessionStorage.getItem('username');
    this._dataService.getThisQuestion(this.question, this.id);
     this._dataService.question.subscribe(
      (response)=> {this.question = response;}
    );
  }  
  newAnswer() {
  this.user_name = sessionStorage.getItem('username');
  this.answer.user_name = this.user_name;
  console.log(this.answer);
  this._dataService.newAnswer(this.answer);
  
  this.answer={
    user_name: '',
    user_answer:'',
    details:'',
    like:0
  },
  this._router.navigateByUrl('/dashboard');
  }
}

