import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(priority: string): string {
    let priorité; 

    if(priority == 'high'){
      priorité = 'Élevée';
    }
    else if (priority == 'low'){
      priorité = 'Basse'; 
    } else {
      priorité = "Moyenne"; 
    }

    return priorité;
  }

}
