import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching',
  pure: false
})
export class FilterPipe implements PipeTransform {

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
    
  //   const voucherArr = [];
    
  //   for (const voucher of value) {
      
  //     if (voucher['title']=== searchInput) {
      
  //       voucherArr.push(voucher);
  //     }
  //   }
    
  
   
  //  return voucherArr;
   
    
  }

}
