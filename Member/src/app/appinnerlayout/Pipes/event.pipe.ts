import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'event',
  pure: false
})
export class EventPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(event:any){
      return JSON.stringify(event).toLocaleLowerCase().includes(args);
    });
  }

}
