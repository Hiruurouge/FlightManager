import { Pipe, PipeTransform } from '@angular/core';
import { PlaneI } from '../Interfaces/company-i';

@Pipe({
  name: 'modele'
})
export class ModelePipe implements PipeTransform {

  transform(modele: Array<PlaneI>, filtre?:string): Array<PlaneI> {
    if(!filtre || filtre.length == 0) return modele;
    if(modele.length == 0) return [];

    return modele.filter(m => m.model.toLowerCase().indexOf(filtre.toLowerCase()) != -1);
  }

}
