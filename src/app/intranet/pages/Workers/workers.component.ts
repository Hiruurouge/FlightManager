import { Component, OnInit} from '@angular/core';
import { WorkerI } from '../../Interfaces/company-i';
import {WorkerService} from "../../services/worker.service";

@Component({
  selector: 'app-Workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit{

  workerFiler:string = '';


  personnel :{id: string, data: WorkerI} = <{id: string, data: WorkerI}>{};

  constructor(public workerService:WorkerService) { }

  ngOnInit(): void {
    this.workerService.getFireWorkers();
  }


  selectPersonnel(nom:string | number):void {
    this.personnel = this.workerService.workers.find(p => p.id == nom)!  ;

  }

  codeInList(code:string | number): boolean {
    let val: boolean = false;
    this.workerService.workers.forEach(element => code == element.id ? val = true : console.log("not in array", element))
    return val;
  }


  deletePersonnel(id: string | number) {
    let val = this.codeInList(id);
    if(val){
      this.workerService.deleteFireWorker(id as string);
      console.log("Worker deleted");
    }else{
      alert("Worker does not exist")
    }
  }


}



