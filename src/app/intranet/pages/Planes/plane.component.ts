import { Component, OnInit } from '@angular/core';
import { PlaneI } from '../../Interfaces/company-i';
import {PlaneService} from "../../services/plane.service";

@Component({
  selector: 'app-Planes',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.css']
})
export class PlaneComponent implements OnInit {
  plane:PlaneI = <PlaneI>{};

  filtreModeleAvions:string = '';
  constructor( public planeService:PlaneService) { }

  ngOnInit(): void {
    this.planeService.getFirePlanes()
  }

  selectAvion(code:string | number):void {
    this.plane = this.planeService.planes.find(av => av.code === code)!;
  }

  codeInListAvion(code:string | number): boolean {
    let val: boolean = false;
    this.planeService.planes.forEach(element => code == element.code ? val = true : console.log("not in array", element))
    return val;
  }

  deletePlane(code: string | number) {
    let val = this.codeInListAvion(code);
    if(val){
      this.planeService.delFirePlane(code as string);
      console.log("Plane deleted");
    }else{
      alert("No plane with this id")
    }
  }
}
