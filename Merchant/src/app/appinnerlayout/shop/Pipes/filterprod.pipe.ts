import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  
  pure: false
})
export class FilterprodPipe implements PipeTransform {

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

  //   const productArr = [];
    
  //   for (const product of value) {
  //     console.log(product['name'])
  //     if (product['name']=== searchInput) {
  //       productArr.push(product);
  //     }
  //   }
    
 
   
  //  return productArr;
   
    
  }

}