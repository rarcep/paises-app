import { Component, OnInit } from '@angular/core';

import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  paises    : Country[] = [];
  hayError  : boolean = false;
  termino   : string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPorRegion(termino)
    .subscribe((resp: Country[]) => {
      this.paises = resp;
    }, (err) => {
      this.paises = [];
      if(termino !== ''){
        this.hayError = true;
      }
    });
  }

  sugerencias(termino: any) {
    this.hayError = false;
    console.log(termino);
  }

}
