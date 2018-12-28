import { Pipe, PipeTransform } from '@angular/core';

/*
@Pipe({ name: 'value', pure: false})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[]=null): any {
   //return Object.values(value)
   //return Object.keys(value)
   let keyArr: any[] = Object.keys(value),
       dataArr = [],
       keyName = args[0];

        keyArr.forEach((key: any) => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });
  
    return dataArr;
  }
}
*/
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for(let key in value) {
        keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

