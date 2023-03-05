import { Component, OnInit } from '@angular/core';
import { FlightI } from '../../Interfaces/company-i';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-Flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  flight :{id: string, data: FlightI} = <{id: string, data: FlightI}>{};

  searchText:string = '';

  constructor(public companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getFireFlights();
    this.flight.data = <FlightI>{};
  }

  selectVols(id:string | number):void {
    this.flight = this.companyService.flights.find(p => p.id == id)!  ;
  }

  codeInList(code:string | number): boolean {
    let val: boolean = false;
    this.companyService.flights.forEach(element => code == element.id ? val = true : console.log("not in array", element))
    return val;
  }


  deleteVols(id: string | number) {
    let val = this.codeInList(id);
    if(val){
      this.companyService.delFireflights(id as string);
      console.log("Flight deleted");
    }else{
      alert("No flight with this id")
    }
  }
}
