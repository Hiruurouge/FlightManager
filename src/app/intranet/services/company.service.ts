import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, deleteDoc, setDoc } from '@angular/fire/firestore';
import {WorkerService} from "./worker.service";
import { BehaviorSubject } from 'rxjs';
import { FlightI } from '../Interfaces/company-i';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  flights: Array<{ id: string, data: FlightI }> = [];
  flights$: BehaviorSubject<Array<{ id: string, data: FlightI }>> = new BehaviorSubject(<Array<{ id: string, data: FlightI }>>[]);
  flight:FlightI=<FlightI>{}

  constructor(private readonly http: HttpClient, private bdd: Firestore,private workerService:WorkerService) {
  }
  async getFireFlights() {
    this.flights = [];
    await this.workerService.getFireWorkers()
    await getDocs(collection(this.bdd, 'flights'))
      .then((vol) => {
        console.log('ici')
        vol.forEach(v => {

          let data = v.data();
          this.flights.push({ id: v.id, data: data as FlightI });
        })
        this.flights$.next(this.flights);
      })
      .catch(err => console.log("Erreur", err));
  }

  async addFireflights(id: string, data: FlightI) {
    const docVol = doc(this.bdd, 'flights', id);
    await setDoc(docVol, data, { merge: true })
      .then((r) => {
        console.log(r)
        this.getFireFlights()
        alert("flight created")
      })
      .catch((err) => {
        console.log(err)
        alert("couldn't create the flight")
      });
  }


  async getFireFlight(id:string)
  {
    const docFlightRef=doc(this.bdd,"flights",id)
    const docFlight=await getDoc(docFlightRef)
     this.flight=docFlight.data() as FlightI
  }
  async delFireflights(id: string) {
    const docVol = doc(this.bdd, "flights", id);
    await deleteDoc(docVol)
      .then((r) => {
        console.log(r)
        this.getFireFlights()
        alert("flight deleted")
      })
      .catch((err) => {
        console.log(err)
      });
  }

}
