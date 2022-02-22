import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Giocatore } from '../shared/Giocatore';

@Injectable({
  providedIn: 'root'
})
export class GiocatoriService {

  constructor(private afs: AngularFirestore) { }

  getGiocatori(): Observable<Giocatore[]> {
    const giocatoriRef = this.afs.collection<Giocatore>('giocatori');
    return giocatoriRef.valueChanges({idField: 'id'});
  }

  createGiocatore(giocatore: Giocatore) {
    const giocatoriCollection = this.afs.collection<Giocatore>('giocatori');
    giocatoriCollection.add(giocatore);
  }

  getGiocatoreById(id: string) {
    const giocatoriCollection = this.afs.collection<Giocatore>('giocatori', ref => ref.where('id', '==', id));
    return giocatoriCollection.valueChanges({idField: 'id'});
  }

  updateGiocatore(giocatore: Giocatore) {
    const giocatoriCollection = this.afs.collection<Giocatore>('giocatori');
    giocatoriCollection.doc(giocatore.id).set(giocatore);
  }
}
