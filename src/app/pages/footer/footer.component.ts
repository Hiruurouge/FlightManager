import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/Services/auth.service';
import { UService } from 'src/app/Services/u.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public authService:AuthService, public auth:Auth) { }

  ngOnInit(): void {
  }

}
