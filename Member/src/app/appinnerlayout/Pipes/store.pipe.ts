import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'store',
  pure: false
})
export class StorePipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(store:any){
      return JSON.stringify(store).toLocaleLowerCase().includes(args);
    });
  }

}
