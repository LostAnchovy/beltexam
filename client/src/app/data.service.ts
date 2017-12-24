import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  user_name;
  question = new BehaviorSubject([]);
  answer = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { }

  setUser(user_name){
    sessionStorage.setItem('username', user_name);
    console.log(sessionStorage.getItem('username'));
  }
  getUser() {
    return this.user_name;
  }
  
  logout(user_name){
    sessionStorage.clear()
    console.log('logout')
  }

  newAnswer(answer) {
    this._http.post('/newanswer', answer).subscribe(
      (response: any) => { }
    );
  } 
  newQuestion(question) {
    this._http.post('/newquestion', question).subscribe(
      (response: any) => { }
    );
  } 

  getAllQuestions(){
    console.log('getAllquestions')
    this._http.get('/all').subscribe((response: any) =>{
        this.question.next(response);
      }
    );
  }

  getAllAnswers(){
    console.log('getAllAnswers')
    this._http.get('/allanswers').subscribe((response: any) =>{
        this.question.next(response);
      }
    );
  }

  removeQuestion(question, id) {
    this._http.delete('destroy/' + id).subscribe(
      (response: any[]) => {
        this.getAllQuestions();
       }
    );
  }

  getThisQuestion(id, callback){
    console.log('getting question')
    this._http.get('onequestion/'+ id).subscribe(
      (response) => {
        console.log(response);
        callback(response);
       }
    );
  }

  // updatePoll(poll, data) {
  //   console.log(poll)
  //   return this._http.post('/poll/' + poll._id, data)
  // }
  




}
