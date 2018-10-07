import { Pipe, PipeTransform } from '@angular/core';
import { Case } from 'app/core/models';

@Pipe({
  name: 'casefilter'
})
export class CasePipe implements PipeTransform {

  transform(items: Case[], filter: string): any {
    if (!items || filter === '') {
      return items;
    }
    console.log(filter);

    let output = items.filter(item => {
      const properties = ['case_nbr'];
      let is_same = false;
      for (let prop of properties){
        const cur_value = item[prop];
        console.log(cur_value);
        const regexp = new RegExp(filter, 'gi');
        is_same = (cur_value.match(regexp)) ?  true : false;
        console.log(is_same);
        if (is_same) {
          break;
        }
      }
      return is_same;
    });

    console.log(output);
    return output;
  } // -- transform

}
