import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';
import { Firestore, doc, getDoc} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UService {

  token: string | number = "Token";
  user: UserI = <UserI>{};

  constructor(private router: Router, private bdd:Firestore) {

  }

  async getFireUser(uid : string|number){
    const userDoc = doc(this.bdd, "user", uid as string);
    let docSnap = await getDoc(userDoc);
    this.user = docSnap.data() as UserI;
    return this.user;
  }
  redirectToLogin()
  {
    this.router.navigateByUrl('/')
    return(true)
  }
}
