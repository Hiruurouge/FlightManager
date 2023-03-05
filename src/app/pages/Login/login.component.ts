import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UService } from 'src/app/Services/u.service';
import { AuthService } from 'src/app/Services/auth.service';
import { getDocs, collection, Firestore } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  id: IdI = {mail:"", password:""};
  ids: string[] = []
  constructor(private bdd: Firestore,private http:HttpClient, private router:Router, private userService:UService, private authService:AuthService) { }

  async ngOnInit(): Promise<void> {

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.ids = [];
        await getDocs(collection(this.bdd, 'users'))
          .then(u => {
            u.forEach(user => {
              let data = user.id;
              this.ids.push(data);
            })
          })
          .catch(erreur => console.log("Erreur", erreur));
        console.log(this.ids)
      } else {
        // User is signed out
        // ...
      }
    });
  }

  logId(){
    console.log(this.id);
  }
  /**
   * Identifies the user by json fils
   */
  checkId(){
    this.http.get<UserI>(`assets/ids/${this.id.mail}@${this.id.password}.json`).subscribe(
      retour =>{
        this.userService.user = retour;
        this.router.navigateByUrl('/intranet')
      },
      erreur => {
        console.log("Erreur", erreur);
        alert('Erreur ' + JSON.stringify(erreur));
      }
    )
  }

  /**
   * Identifies the user by Firebase authentification
   */
  checkIdFirebase(){
    this.authService.login(this.id.mail as string, this.id.password as string);
  }

}
