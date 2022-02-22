import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private toastCtrl: ToastController) { }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
    .then(res => this.router.navigateByUrl('/tabs'))
    .catch(err => {
      this.toastCtrl.create({
        message: `Errore durante il login ${err}`,
        duration: 2000
      }).then(toast => toast.present())
    })
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.router.navigateByUrl('/tabs'));
  }

  logout() {
    this.auth.signOut().then(res => this.router.navigateByUrl('/'));
  }
}
