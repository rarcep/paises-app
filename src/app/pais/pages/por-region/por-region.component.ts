import { Component, OnInit } from '@angular/core';

import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones    : string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises      : Country[] = [];
  hayError    : boolean = false;
  termino     : string = '';

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activaRegion(region: string){
    if(region === this.regionActiva) {return;}
    this.regionActiva = region;
    this.paises = [];
    this.buscar(region);
  }

  getClassCss(region: string): string {
    return (region === this.regionActiva)
        ? 'btn btn-primary'
        : 'btn btn-outline-primary';
  }

  buscar(region: string) {
    this.hayError = false;
    this.termino = region;
    this.paisService.buscarPorRegion(region)
    .subscribe((resp: Country[]) => {
      this.paises = resp;
    }, (err) => {
      this.paises = [];
      if(region !== ''){
        this.hayError = true;
      }
    });
  }

}
