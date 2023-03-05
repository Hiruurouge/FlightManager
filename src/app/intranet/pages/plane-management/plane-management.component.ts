import { Component, OnInit } from '@angular/core';
import {Firestore} from "@angular/fire/firestore";
import {ActivatedRoute} from "@angular/router";
import {PlaneI} from "../../Interfaces/company-i";
import {Router} from "@angular/router";
import {PlaneService} from "../../services/plane.service";

@Component({
  selector: 'app-plane-management',
  templateUrl: './plane-management.component.html',
  styleUrls: ['./plane-management.component.css']
})
export class PlaneManagementComponent implements OnInit {

  plane:PlaneI=<PlaneI>{}
  id:string='null'
  constructor(private firestore: Firestore, public  route:ActivatedRoute,private router:Router, private planeService:PlaneService) {}

 async ngOnInit(): Promise<void> {
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.id = params['id'];
        }
      );
    if(this.id!=='null')
    {
      await this.planeService.getFirePlane(this.id)
      this.plane=this.planeService.plane
    }
  }

  onSubmit() {

    this.planeService.UpdateFirePlane(this.plane.code as string, this.plane).then(r =>console.log(r))
    this.router.navigateByUrl("/intranet/plane")
  }
}
