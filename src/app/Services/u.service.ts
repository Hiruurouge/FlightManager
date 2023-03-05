import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';
import { Firestore, doc, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UService {

  token: string | number = "MonTokenAvecUnValeur"; // token reçu après la Login de l'utilisateur (enlever la chaine et mettre un ! devant token)
  user: UserI = <UserI>{}; // typé mon objet en UserI

  constructor(private router: Router, private bdd:Firestore) {
    //this.getFireUser(this.auth.currentUser?.uid as string);
    //console.log("USER**",this.user);
  }

  /** initaliser le user */

  async getFireUser(uid : string|number){
    const userDoc = doc(this.bdd, "user", uid as string);
    let docSnap = await getDoc(userDoc);
    this.user = docSnap.data() as UserI;
    return this.user;
  }

  /** deconnecter un utilisateur */
  deconnexion(){
    this.user = <UserI>{};
    //this.authService.logout();
    this.router.navigateByUrl('/')
  }
}
