import { Pipe, PipeTransform } from '@angular/core';
import { User, Search } from 'app/core/models';

@Pipe({
  name: 'userfilter'
})
export class UserPipe implements PipeTransform {

  transform(items: User[], filter: string): any {
    if (!items) {
      return items;
    }
    /*
    if (!items || (filter.prop === 'description' && filter.value == '')) {
      return items;
    }
    */

    let output = items.filter(item => {
      const properties = ['username', 'first_name', 'last_name', 'middle_name'];
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
      /*
      const cur_value = item[filter.prop];
      if (typeof cur_value === 'string') {
        const regexp = new RegExp(filter.value.toString(), 'gi');
        return (cur_value.match(regexp)) ?  true : false;
      } else {
          return (cur_value === filter.value);
      }
      */
    });

    return output;
  } // -- transform

}
