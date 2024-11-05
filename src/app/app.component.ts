import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { MedirPuntuacionComponent } from './medir-puntuacion/medir-puntuacion.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DadosComponent, MedirPuntuacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'minihack';
}
