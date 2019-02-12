import { Pipe, PipeTransform } from '@angular/core';
import { Specimen } from 'app/core/models/specimen';

@Pipe({
  name: 'specimenfilter'
})
export class SpecimenPipe implements PipeTransform {

  transform(items: Specimen[], filter: string): any {
    if (!items || filter === '') {
      return items;
    }

    let output = items.filter(item => {
      const properties = ['name'];
      let is_same = false;
      for (let prop of properties){
        const cur_value = item[prop];
        const regexp = new RegExp(filter, 'gi');
        is_same = (cur_value.match(regexp)) ?  true : false;
        if (is_same) {
          break;
        }
      }
      return is_same;
    });

    return output;
  } // -- transform
}
