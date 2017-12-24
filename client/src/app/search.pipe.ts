import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(surveys: any, searchText: any): any {
    if (searchText == null) {
      return surveys;
    }
    return surveys.filter(function(survey){
      return survey.question.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    });
  }

}
