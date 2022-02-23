import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'faq'
})
export class FaqPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
