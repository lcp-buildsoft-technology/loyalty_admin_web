import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redemption',
  pure: false
})
export class RedemptionPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(redemption:any){
      return JSON.stringify(redemption).toLocaleLowerCase().includes(args);
    });
  }
}
