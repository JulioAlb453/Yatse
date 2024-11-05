import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-medir-puntuacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medir-puntuacion.component.html',
  styleUrls: ['./medir-puntuacion.component.css'],
})
export class MedirPuntuacionComponent {
  resultado: number[] = [];
  puntuacionTotal: number = 0;

  objetivosMenores = [
    { valor: 1, cantidadMinima: 2 }, 
    { valor: 2, cantidadMinima: 2 }, 
    { valor: 3, cantidadMinima: 2 }, 
    { valor: 4, cantidadMinima: 2 }, 
    { valor: 5, cantidadMinima: 2 }, 
    { valor: 6, cantidadMinima: 2 },
  ];

  objetivoMayores = [
    { valor: 1, cantidadMinima: 3 }, 
    { valor: 2, cantidadMinima: 4 }, 
    { valor: 3, cantidadMinima: 3, cantidadExtra: 2 }, 
    { valor: 4, cantidadMinima: 1, cantidadExtra: 2, cantidadExtra1: 3, cantidadExtra2: 4 } 
  ];

  conteos: { [key: number]: number } = {};

  recibirResultados(resultados: number[]): void {
    this.resultado = resultados;
    this.calcularConteos();
    this.calcularPuntuacion();
  }

  calcularConteos(): void {
    this.conteos = {}; 
    this.resultado.forEach(dado => {
      this.conteos[dado] = (this.conteos[dado] || 0) + 1;
    });
  }

  calcularPuntuacion(): void {
    this.puntuacionTotal = 0;

    this.objetivosMenores.forEach(objetivo => {
      const cantidad = this.conteos[objetivo.valor] || 0;

      if (cantidad >= objetivo.cantidadMinima) {
        this.puntuacionTotal += objetivo.valor * cantidad; 
      }
    });

    this.objetivoMayores.forEach(objetivo => {
      const cantidad = this.conteos[objetivo.valor] || 0;

      if (objetivo.valor === 3) {
        if (cantidad >= objetivo.cantidadMinima) {
          const otrosDados = Object.keys(this.conteos).filter(val => parseInt(val, 10) !== 3);
          let dadosDeOtroTipo = 0;

          otrosDados.forEach(val => {
            dadosDeOtroTipo += this.conteos[parseInt(val, 10)];
          });

          if (dadosDeOtroTipo >= (objetivo.cantidadExtra || 0)) {
            this.puntuacionTotal += 30; 
          }
        }
      } 
      else if (objetivo.valor === 4) {
        const secuenciaBaja = [1, 2, 3, 4]; 
        const secuenciaAlta = [2, 3, 4, 5]; 
        if (this.verificarSecuencia(secuenciaBaja) || this.verificarSecuencia(secuenciaAlta)) {
          this.puntuacionTotal += 40; 
        }
      } 
      // Otros objetivos
      else {
        if (cantidad >= objetivo.cantidadMinima) {
          this.puntuacionTotal += objetivo.valor * cantidad; 
        }
      }
    });
  }

  verificarSecuencia(secuencia: number[]): boolean {
    return secuencia.every(valor => (this.conteos[valor] || 0) >= 1);
  }
}
