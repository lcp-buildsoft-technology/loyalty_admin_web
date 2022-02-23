import { Pipe, PipeTransform } from '@angular/core';
import { ReturnDocument } from 'mongoose/node_modules/mongodb';

@Pipe({
  name: 'searchmember',
  pure: false
})


export class FiltermemberPipe implements PipeTransform {
   
  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(member:any){
      return JSON.stringify(member).toLocaleLowerCase().includes(args);
    });
    
    // if (value.length === 0 || searchInput === '') {
      
    //   return value;
    // }
    
  //   const memberArr = [];
    
  //   for (const member of value) {
      
  //     if (member['name']=== searchInput) {
      
  //       memberArr.push(member);
  //     }
  //   }
    
 
   
  //  return memberArr;
   
    
  }

}