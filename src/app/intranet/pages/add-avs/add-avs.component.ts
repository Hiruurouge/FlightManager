import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { AirportI, PlaneI, WorkerI, FlightI } from '../../Interfaces/company-i';
import { CompanyService } from '../../services/company.service';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {AirportService} from "../../services/airport.service";
import {WorkerService} from "../../services/worker.service";
import {PlaneService} from "../../services/plane.service";

@Component({
  selector: 'app-add-avs',
  templateUrl: './add-avs.component.html',
  styleUrls: ['./add-avs.component.css']
})
export class AddAvsComponent implements OnInit {
  newAvs = <FlightI>{
    code: '',
    plane: {code: '', model: '', type: '', passNumber: 0},
    date: new Date(),
    workers: [],
    DepartureAirport: '',
    ArrivalAirport: '',
    duration: 0
  };
  airports: Array<AirportI> = [];
  models: Array<PlaneI> = [];
  workers: Array<{ id: string, data: WorkerI }> = [];
  nomsComposes: Array<string> = []
  nomsAeroports: String[] = []
  id: string = ''

   constructor(private db: Firestore,private planeService:PlaneService, private companyService: CompanyService, private route: ActivatedRoute,private router:Router,private airPortService:AirportService,private workerService:WorkerService) {
  }
  async ngOnInit(): Promise<void> {

    await this.planeService.getFirePlanes()
    this.models = this.planeService.planes
    await this.airPortService.getAirports()
    this.airports = this.airPortService.airports
    this.nomsAeroports = this.airports.map(
      (aeroport: AirportI): string => aeroport.name
    );
    this.workers = this.workerService.workers
    this.nomsComposes = this.workers.map((personne: { id: string, data: WorkerI }): string =>
      `${personne.data.firstname} ${personne.data.name}`
    );
    console.log(this.workers)
    console.log(this.nomsComposes)

    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.id = params['id'];
        }
      );
    if(this.id)
    {
      await this.companyService.getFireFlight(this.id)
      this.newAvs= this.companyService.flight
    }

  }

  onSubmit() {
    this.companyService.addFireflights(this.newAvs.code as string,this.newAvs)
    this.router.navigateByUrl('/intranet')
  }
}
