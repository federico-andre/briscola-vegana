import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Nuova Partita', url: '/partita/nuova', icon: 'add' },
    { title: 'Storico', url: '/folder/Outbox', icon: 'archive' },
    { title: 'Statistiche', url: '/folder/Favorites', icon: 'pulse' },
    { title: 'Giocatori', url: '/giocatori/elenco', icon: 'people' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
