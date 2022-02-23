import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gift',
  pure: false
})
export class GiftPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(userreward:any){
      return JSON.stringify(userreward).toLocaleLowerCase().includes(args);
    });
  }

}
