import { Pipe, PipeTransform } from '@angular/core';
import { WorkerI } from '../Interfaces/company-i';

@Pipe({
  name: 'Worker'
})
export class WorkerPipe implements PipeTransform {

  transform(worker: Array<{ id: string, data: WorkerI }>, filtre?:string): Array<{ id: string, data: WorkerI }> {
    if (!filtre || filtre.length == 0) return worker;
    if (worker.length == 0) return [];
    return worker.filter(p => p.id.toLowerCase().indexOf(filtre.toLowerCase()) != -1);
  }

}
