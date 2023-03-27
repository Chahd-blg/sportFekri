import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asterix'
})
export class AsterixPipe implements PipeTransform {
  ch="Abderrahmen";
  

  transform(ch: string): any {
  
  }

}
