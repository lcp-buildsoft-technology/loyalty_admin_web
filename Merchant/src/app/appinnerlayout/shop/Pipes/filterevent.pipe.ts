import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent',
  pure: false
})
export class FiltereventPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(member:any){
      return JSON.stringify(member).toLocaleLowerCase().includes(args);
    });

 
   
    
  }

}