import { Pipe, PipeTransform } from '@angular/core';
import { ReturnDocument } from 'mongoose/node_modules/mongodb';


@Pipe({
  name: 'filteroutlet'
})
export class FilteroutletPipe implements PipeTransform {

 
  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(member:any){
      return JSON.stringify(member).toLocaleLowerCase().includes(args);
    });
  }

}