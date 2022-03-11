import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'null'
})
export class NullPipe implements PipeTransform {

  transform(value: Date | null | string): string | Date {
    let message; 
  
    if (value == null){
      message = "- à définir -"
    } else {
      message = value; 
    }

    return message;
  }

}
