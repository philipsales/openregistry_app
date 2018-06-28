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
    console.log(filter);
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
        console.log(cur_value);
        const regexp = new RegExp(filter, 'gi');
        is_same = (cur_value.match(regexp)) ?  true : false;
        console.log(is_same);
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

    console.log(output);
    return output;
  } // -- transform

}



@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(items: Position[], filter: Search): any {
    if (!items || (filter.prop == 'description' && filter.value == '')) {
      return items;
    }

    return items.filter(item => {
      const cur_value = item[filter.prop];
      if (typeof cur_value === 'string') {
        const regexp = new RegExp(filter.value.toString(), 'gi');
        return (cur_value.match(regexp)) ?  true : false;
      } else {
          return (cur_value == filter.value);
      }
    });
  }//-- transform
}