import { Pipe, PipeTransform } from '@angular/core';
import { SpecType } from 'app/core/models';

@Pipe({
  name: 'spectypefilter'
})
export class SpectypePipe implements PipeTransform {

  transform(items: SpecType[], filter: string): any {
    if (!items || filter === '') {
      return items;
    }
    console.log(filter);

    let output = items.filter(item => {
      const properties = ['name'];
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
