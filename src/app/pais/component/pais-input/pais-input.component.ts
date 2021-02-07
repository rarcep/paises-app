import { compileNgModule } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css']
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder : string = '';
  @Output() onEnter     : EventEmitter<string> = new EventEmitter();
  @Input()  onDebounce  : EventEmitter<string> = new EventEmitter();

  termino   : string = '';
  debouncer : Subject<string> = new Subject();

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.onDebounce.emit( valor );
      console.log(valor);
    });
  }

  buscar() {
    console.log(this.termino);
    this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino);
  }

}
