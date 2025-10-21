import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  score = 0;
  korokLeft = 50;
  korokTop = 50;
  message = '¡Clickea al Korok!';

  moveKorok() {
    this.korokLeft = Math.random() * 80; // porcentaje
    this.korokTop = Math.random() * 80;
    this.score++;
    this.message = '¡Yahaha!';
    if (this.score === 50) {
      setTimeout(() => {
        Swal.fire({
          title: ' ¡Felicidades!',
          text: '¡Has perdido tiempo de tu preciada vida!',
          imageWidth: 150,
          imageHeight: 150,
          background: 'rgba(25, 30, 20, 0.95)',
          color: '#ffe58a',
          confirmButtonText: '¡Yahaha!',
          confirmButtonColor: '#caa75b',
        });
      }, 300);
    }
    setTimeout(() => (this.message = '¡Clickea al Korok!'), 1000);
  }
}
