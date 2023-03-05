import { Injectable } from '@angular/core';
import {  getAuth ,createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, setDoc} from '@angular/fire/firestore';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { UService } from 'src/app/Services/u.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: IdI = <IdI>{};
  user: UserI = <UserI>{};
  users: Array<UserI> = [];

  constructor(private bdd: Firestore, private uServ:UService) { }

  async getFireUser(){
    this.users = [];
    await getDocs(collection(this.bdd, 'user'))
      .then(u => {
        u.forEach(user => {
          let data: UserI = user.data() as UserI
          data.uid = user.id;
          this.users.push(data);
        })
      })
      .catch(erreur => console.log("Erreur", erreur));
  }

  async  getUserByUid(uid: string | number){
    await this.uServ.getFireUser(uid).then(data => this.user = data);
  }

  idInListUsers(uid:string | number): boolean {
    let val: boolean = false;
    this.users.forEach( element => uid == element.uid ? val = true : console.log("not in array", element))
    return val;
  }

  createAuthUser(new_user: UserI, id: IdI){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, id.mail, id.password)
      .then((userCredential) => {
        const user = userCredential.user;
        new_user.uid = user.uid;
        this.addFireUser(new_user);
        console.log('USER CREATED',user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ErrorCode : ', errorCode, ', ' ,errorMessage);
      });
  }

  async addFireUser(user :UserI) {
    const docUser = doc(this.bdd, 'users', user.uid as string);
    // Créer ou mettre à jour l'ustilisateur
    await setDoc(docUser, user, { merge: true })
      .then((r) => {
        console.log(r)
        alert("L'utilisateur a été crée")
        console.log("L'utilisateur à été crée")
      })
      .catch((err) => {
        console.log("L'utilisateur n'a été crée")
        console.log(err)
      });
  }

  async updateFireUser(data: UserI) {
    console.log(data)
    const docUser = doc(this.bdd, "users", data.uid as string);
    await setDoc(docUser, data, { merge: true })
      .then((r) => {
        alert("L'utilisateur a été mis à jour")
        console.log(r)
      })
      .catch((err) => {
        console.log("L'utilisateur n'a été mis à jour")
        console.log(err)
      });
  }
}
