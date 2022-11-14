import { Component, OnInit } from '@angular/core';
import { CargaService } from './carga.service';

@Component({
  selector: 'app-pantalla-de-carga',
  templateUrl: './pantalla-de-carga.component.html',
  styleUrls: ['./pantalla-de-carga.component.css']
})
export class PantallaDeCargaComponent implements OnInit {
  carga$ = this.cargaserv.cargando$;
  constructor(private readonly cargaserv: CargaService) { }

  ngOnInit(): void {
    this.cargaserv.cargando();

  }

}
