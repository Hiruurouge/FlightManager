import { Component, OnInit } from '@angular/core';
import { AirportI } from '../../Interfaces/company-i';
import { AirportService } from "../../services/airport.service";

@Component({
  selector: 'app-airports-manage',
  templateUrl: './airports-manage.component.html',
  styleUrls: ['./airports-manage.component.css']
})
export class AirportsManageComponent implements OnInit {

  airports: Array<AirportI> = [];
  totalPages: number = 1;
  pageSize = 10;
  pages: any;
  currentPage = 1;
  currentAirports: Array<AirportI> = [];
  searchTerm: string = '';

  constructor(private airportService: AirportService) { }
  totalPagesArray: number[] = [];

  calculateTotalPages(): void {
    const totalItems = this.airports.length;
    const totalPages = Math.ceil(totalItems / this.pageSize);

    this.totalPagesArray = [];

    for (let i = 1; i <= totalPages; i++) {
      this.totalPagesArray.push(i);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.airportService.getAirports();
    this.processAirports();
  }

  private processAirports(): void {
    this.airports = this.airportService.airports;
    this.filterAirports();
    this.totalPages = Math.ceil(this.currentAirports.length / this.pageSize);
    this.pages = Array.from(Array(this.totalPages), (x, i) => i + 1);
    this.goToPage(1);
    this.calculateTotalPages();
  }

  filterAirports(): void {
    if (this.searchTerm === '') {
      this.currentAirports = this.airports;
    } else {
      this.currentAirports = this.airports.filter((airport: AirportI) => {
        return airport.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          || airport.city.toLowerCase().includes(this.searchTerm.toLowerCase())
          || airport.country.toLowerCase().includes(this.searchTerm.toLowerCase())
          || airport.iata_code.toLowerCase().includes(this.searchTerm.toLowerCase())
      });
    }
  }

  search(): void {
    this.filterAirports();
    this.totalPages = Math.ceil(this.currentAirports.length / this.pageSize);
    this.pages = Array.from(Array(this.totalPages), (x, i) => i + 1);
    this.goToPage(1);
    this.calculateTotalPages();
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.processAirports();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.currentAirports.length);
    this.currentAirports = this.currentAirports.slice(startIndex, endIndex);
  }

}
