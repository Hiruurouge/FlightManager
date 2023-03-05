import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/Services/auth.service';
import { UService } from 'src/app/Services/u.service';

@Component({
  selector: 'app-NavBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public u:UService, public auth:Auth, public authService:AuthService) { }

  ngOnInit(): void {
    }

}
