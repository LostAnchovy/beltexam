import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { Router} from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core'
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { SearchPipe } from '../search.pipe';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user_name = sessionStorage.getItem('username');
question;
answer;

  constructor(private _dataService: DataService, private _router: Router) { }
  logout(){
    this._dataService.logout('user_name')
    this._router.navigateByUrl('/');
    
  }

  removeQuestion(question, id){
    this._dataService.removeQuestion(question, id);
  }
  // getAllQuestions(question, id){
  //   this._dataService.getAllQuestions();

  ngOnInit() {
    if (this.user_name == null){
      this._router.navigateByUrl('/');
      }

      
    this._dataService.question.subscribe(
      (question)=> {this.question = question;}
    );
    this._dataService.getAllQuestions();
    
    this._dataService.answer.subscribe(
      (answer)=> {this.answer = answer;}
    );
    
  }

}
