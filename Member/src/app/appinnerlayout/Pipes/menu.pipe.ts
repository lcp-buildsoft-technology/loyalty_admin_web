import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'menu',
  pure: false
})
export class MenuPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(menu:any){
      return JSON.stringify(menu).toLocaleLowerCase().includes(args);
    });
  }
}