import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faq',
  pure: false
})
export class FaqPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(faq:any){
      return JSON.stringify(faq).toLocaleLowerCase().includes(args);
    });
  }

}