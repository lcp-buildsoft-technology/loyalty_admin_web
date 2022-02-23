import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnumber',
  pure: false
})
export class FiltervenuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args =args.toLowerCase();

    return value.filter(function(member:any){
      return JSON.stringify(member).toLocaleLowerCase().includes(args);
    });

  // transform(value: any, searchInput: string) {
  //   if (value.length === 0 || searchInput === '') {
  //     return value;
  //   }
  

    // const venueArr = [];
    
    // for (const venue of value) {
     
    //   if (venue['phonenumber']=== searchInput) {
    //     venueArr.push(venue);
    //   }
    //   else if (venue['firstname']=== searchInput){
    //     venueArr.push(venue);
    //   }
    //   else if(venue['_value'] === searchInput){
    //     venueArr.push(venue);
    //   }
    //   else if(venue['time'] === searchInput){
    //     venueArr.push(venue);
    //   }
    // }
    
 
   
  //  return venueArr;
   
    
  }

}
