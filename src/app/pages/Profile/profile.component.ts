import { Component, OnInit } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { UService  } from 'src/app/Services/u.service';



@Component({
  selector: 'app-Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public auth: Auth, public uServ:UService) { }


  ngOnInit(): void {
    this.getUser();
  }

  getUser():void {
    this.uServ.getFireUser(this.auth.currentUser?.uid as string).then(u => this.uServ.user = u);
  }

}
