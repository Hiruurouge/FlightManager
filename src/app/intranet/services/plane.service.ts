import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, deleteDoc, setDoc,getDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { PlaneI } from '../Interfaces/company-i';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {
  planes: Array<PlaneI> = [];
  plane: PlaneI=<PlaneI>{}
  planes$: BehaviorSubject<Array<PlaneI>> = new BehaviorSubject<Array<PlaneI>>([]);

  constructor(private readonly bdd: Firestore) { }
  async getFirePlane(code: string) {
    const docRef = doc(this.bdd, "plane", code);
    const docPlane=await getDoc(docRef);
    this.plane= docPlane.data() as PlaneI
  }
  async getFirePlanes() {
    this.planes = [];
    await getDocs(collection(this.bdd, 'plane'))
      .then(av => {
        av.forEach(a => {
          this.planes.push(a.data() as PlaneI);
        })
      })
      .catch(erreur => console.log("Erreur", erreur));
    this.planes$.next(this.planes);
  }

  async delFirePlane(code: string) {
    const docPlane = doc(this.bdd, "plane", code);
    await deleteDoc(docPlane)
      .then((r) => {
        this.getFirePlanes()
        alert("Plane deleted")
      })
      .catch((err) => {
        alert("Couldn't delete the plane")
      });
  }

  async UpdateFirePlane(code: string, data: PlaneI) {
    const docPlane = doc(this.bdd, "plane", code);
    await setDoc(docPlane, data, { merge: true })
      .then((r) => {
        alert("Plane updated")
      })
      .catch((err) => {
        console.log("Couldn't update the plane")
      });
  }

  async addFirePlane(code: string, data: PlaneI) {
    const docPlane = doc(this.bdd, 'plane', code);
    await setDoc(docPlane, data, { merge: true })
      .then((r) => {
        this.getFirePlanes()
        alert("Plane Created/Updated")
      })
      .catch((err) => {
        console.log("Couldn't create/update the plane")
      });
  }
}
