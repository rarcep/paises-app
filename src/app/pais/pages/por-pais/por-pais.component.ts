import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent implements OnInit {
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  hayError: boolean = false;
  mostrarSugerencia: boolean = false;
  termino: string = '';

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencia = false;
    this.termino = termino;
    this.paisService.buscarPais(termino).subscribe(
      (resp: Country[]) => {
        this.paises = resp;
      },
      (err) => {
        this.paises = [];
        if (termino !== '') {
          this.hayError = true;
        }
      }
    );
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.mostrarSugerencia = true;
    this.termino = termino;
    console.log(termino);
    this.paisService.buscarPais(termino).subscribe(
      (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      (err) => (this.paisesSugeridos = [])
    );
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
