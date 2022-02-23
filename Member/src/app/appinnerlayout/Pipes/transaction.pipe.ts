import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  transform(value: any, args?: any): any  {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(transaction:any){
      return JSON.stringify(transaction).toLocaleLowerCase().includes(args);
    });
  }

}
