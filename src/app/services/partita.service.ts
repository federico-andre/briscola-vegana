import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Partita } from '../shared/Partita';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {

  constructor(private afs: AngularFirestore) { }

  getPartitaInCorso() {
    // status = 0 --> Partita chiusa
    // status = 1 --> Partita in corso
    const partitaCollection = this.afs.collection<Partita>('partita', ref => ref.where('status', '==', 1));
    return partitaCollection.valueChanges({ idField: 'idField' });
  }

  createPartita(partita: Partita) {
    const partitaCollection = this.afs.collection<Partita>('partita');
    partitaCollection.add(partita);
  }

  async updatePartita(partita: Partita) {
    const partitaCollection = this.afs.collection<Partita>('partita');
    partitaCollection.doc(partita.idField).set(partita);
  }

  getPartitaById(id: string) {
    const partitaCollection = this.afs.collection<Partita>('partita', ref => ref.where('id', '==', id));
    return partitaCollection.valueChanges({ idField: 'idField' });
  }

  getStoricoPartite() {
    const partitaCollection = this.afs.collection<Partita>('partita', ref => ref.where('status', '==', 0));
    return partitaCollection.valueChanges({ idField: 'idField' });
  }

}
