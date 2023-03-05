import { Pipe, PipeTransform } from '@angular/core';
import { AirportI } from '../Interfaces/company-i';

@Pipe({
  name: 'paginateAirports'
})
export class PaginateAirportsPipe implements PipeTransform {
  transform(airports: AirportI[], currentPage: number, pageSize: number): AirportI[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return airports.slice(startIndex, endIndex);
  }
}