import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css'],
})
export class DadosComponent {
  resultados: number[] = Array(5).fill(0); // Iniciar resultados con valores predeterminados
  dadosBloqueados: boolean[] = Array(5).fill(false); // Todos los dados desbloqueados inicialmente
  lanzamientosRestantes: number = 3; // Contador de lanzamientos restantes

  @Output() resultadosLanzados = new EventEmitter<number[]>();

  lanzarDados() {
    if (this.lanzamientosRestantes > 0) {
      for (let i = 0; i < 5; i++) {
        // Solo lanzar el dado si no está bloqueado
        if (!this.dadosBloqueados[i]) {
          this.resultados[i] = Math.floor(Math.random() * 6 + 1);
        }
      }
      this.resultadosLanzados.emit([...this.resultados]); // Emitir una copia de los resultados actuales
      this.lanzamientosRestantes--; // Decrementar lanzamientos restantes
    }
  }

  bloquearDado(index: number) {
    // Cambiar el estado de bloqueo del dado en el índice especificado
    this.dadosBloqueados[index] = !this.dadosBloqueados[index];
  }

  reiniciarLanzamientos() {
    this.lanzamientosRestantes = 3; // Reiniciar lanzamientos
    this.dadosBloqueados = Array(5).fill(false); // Reiniciar bloqueo de dados
    this.resultados = Array(5).fill(0); // Reiniciar valores de dados
  }
}
