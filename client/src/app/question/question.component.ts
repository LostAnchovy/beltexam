import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs'
import { identifierModuleUrl } from '@angular/compiler';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  question;
  id;
  answers;

  constructor(private _dataService: DataService, private _route:ActivatedRoute) {

    //use activated routes to get the individual instance of the question to display    
    this._route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this._dataService.getThisQuestion(this.id, (question) => {
        this.question = question;
      })
    })
  }
  

  ngOnInit() {
    //subscribet the dataservice 
    this._dataService.question.subscribe(
      (response)=> {this.question = response;}
    );
    this._dataService.getThisQuestion(this.question, this.id);

     // subscribe to answer in dataservices
    this._dataService.answer.subscribe(
      (response)=> {this.answers = response;}
    );
   
   
  }

}

