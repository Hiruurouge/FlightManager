import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {WorkE, WorkerI} from "../../Interfaces/company-i";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkerService} from "../../services/worker.service";

@Component({
  selector: 'app-workers-management',
  templateUrl: './workers-management.component.html',
  styleUrls: ['./workers-management.component.css']
})
export class WorkersManagementComponent implements OnInit,OnChanges {
  personnel:{id:string,data:WorkerI}={id:Date.now().toString(),data:{name:'',firstname:[''],work:WorkE.copilote}}

  id:string='null'
  constructor(private route:ActivatedRoute,private router:Router,private workerService:WorkerService) {

  }
ngOnChanges(changes: SimpleChanges) {
    console.log(this.personnel)
}

  async  ngOnInit(): Promise<void> {
  this.route.queryParams
      .subscribe(params => {
          this.id = params['id'];
        }
      );
    if(this.id)
    {
      console.log(this.id)
      await this.workerService.getFireWorkers();
      this.personnel = this.workerService.workers.find(p => p.id == this.id)!  ;
    }
  }
  onSubmit()
  {
    console.log(this.personnel)
    this.workerService.updateFireWorker(this.personnel.id, this.personnel.data).then(r =>console.log(r))
    this.router.navigateByUrl('/intranet/workers')
  }
}
