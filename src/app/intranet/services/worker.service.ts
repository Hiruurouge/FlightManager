import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, doc, deleteDoc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { WorkerI } from '../Interfaces/company-i';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  workers: Array<{ id: string, data: WorkerI }> = [];
  workers$: BehaviorSubject<Array<{ id: string, data: WorkerI }>> = new BehaviorSubject(<Array<{ id: string, data: WorkerI }>>[]);

  constructor(private bdd: Firestore) {
    this.getFireWorkers()
  }

  async getFireWorkers() {
    this.workers = []; // reinitialized array list
    await getDocs(collection(this.bdd, 'workers'))
      .then((per) => {
        per.forEach(p => {
          this.workers.push({ id: p.id, data: p.data() as WorkerI });
        })
        this.workers$.next(this.workers);
      })
      .catch(err => console.log("Erreur", err));
  }

  async updateFireWorker(id: string, data: WorkerI) {
    const docPersonnel = doc(this.bdd, "workers", id);
    await setDoc(docPersonnel, data, { merge: true })
      .then((r) => {
        alert("Worker updated")
        console.log(r)
      })
      .catch((err) => {
        console.log("Worker not updated")
        console.log(err)
      });
  }

  async deleteFireWorker(id: string) {
    const docPersonnel = doc(this.bdd, "workers", id);
    await deleteDoc(docPersonnel)
      .then((r) => {
        this.getFireWorkers()
        alert("Worker deleted")
        throw r
      })
      .catch((err) => {
        throw err
      });
  }
}
