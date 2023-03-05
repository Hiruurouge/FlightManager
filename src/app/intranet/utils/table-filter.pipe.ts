import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      for (const property in item) {
        if (Object.prototype.hasOwnProperty.call(item, property)) {
          if (item[property] != null && item[property].toString().toLowerCase().includes(searchText)) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
