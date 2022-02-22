import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GiocatoriService } from 'src/app/services/giocatori.service';
import { Giocatore } from 'src/app/shared/Giocatore';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

export interface Image {
  formato?: string,
  base64?: string
}

@Component({
  selector: 'app-giocatore-modal',
  templateUrl: './giocatore-modal.page.html',
  styleUrls: ['./giocatore-modal.page.scss'],
})
export class GiocatoreModalPage implements OnInit {

  nuovoGiocatoreForm: FormGroup;

  image: Image = null;
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private fb: FormBuilder, 
              private giocatoreService: GiocatoriService, 
              private modalCtrl: ModalController, 
              public actionSheetController: ActionSheetController,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.nuovoGiocatoreForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      descrizione: ['', [Validators.required]],
      nickname: ['', [Validators.required]],
    });
  }

  async selectImage() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    // this.afs.upload()
  
    // Can be set to the src of an image now
    this.image = {
      formato: photo.format,
      base64: photo.base64String
    };
    this.isLoading = true;
    // console.log(this.croppedImagePath)
  };

  creaGiocatore() {
    if(!this.nuovoGiocatoreForm.valid) {
      console.log("form non valido");
      return
    }

    const filePath = `giocatori/${this.nickname.value}.${this.image.formato}`;
    const fileRef = this.storage.ref(filePath);
    const task = fileRef.putString(this.image.base64, 'base64');

    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe(value => {
          console.log("download url:", value);
          
          const newPlayer: Giocatore = {
            nome: this.nome.value,
            cognome: this.cognome.value,
            nickname: this.nickname.value,
            description: this.descrizione.value,
            totalPoints: 0,
            imageUrl: value
          }
       
          this.giocatoreService.createGiocatore(newPlayer);
          this.modalCtrl.dismiss();
        })
      } )
   ).subscribe()

  }

  get nome() {
    return this.nuovoGiocatoreForm.get('nome');
  }

  get cognome() {
    return this.nuovoGiocatoreForm.get('cognome');
  }

  get descrizione() {
    return this.nuovoGiocatoreForm.get('descrizione');
  }

  get nickname() {
    return this.nuovoGiocatoreForm.get('nickname');
  }

}
