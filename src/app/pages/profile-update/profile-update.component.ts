import { Component, OnInit } from '@angular/core';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {UService} from '../../Services/u.service'
import {updateProfile} from "@angular/fire/auth";
import { Auth } from '@angular/fire/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {


  constructor(private bdd: Firestore,public  uServ:UService,private auth:Auth, private router:Router) {}

  ngOnInit(): void {
    console.log(this.uServ.user)
  }

  async update(){
    const docUser = doc(this.bdd,'user',this.auth.currentUser!.uid);
    // Créer ou mettre à jour l'utilisateur
    await setDoc(docUser,this.uServ.user,{merge:true})
      .then((r) =>
      {
        console.log(r)
        alert("L'utilisateur à été mis a jour")
        this.router.navigateByUrl('/profil')
      } )
      .catch((err) => {
        alert("Erreur")
        console.log(err)
      });

    updateProfile(this.auth.currentUser!, {
      displayName: this.uServ.user.name, photoURL: this.uServ.user.photoURL
    }).then((r) => {
     alert("les données ont bien été mis à jour");
     console.log(r)
    }).catch((error) => {
      console.log(error);
    })
  }
}
