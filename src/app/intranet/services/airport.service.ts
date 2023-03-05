import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirportI } from '../Interfaces/company-i';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
   airports: Array<AirportI>= [];

  constructor(private http: HttpClient) {
    this.getAirports()
  }

  async getAirports(): Promise<void> {
    await this.http.get<Array<AirportI>>("assets/data/aeroports.json").toPromise().then(r=>
      this.airports=r!

    );
  }
}
