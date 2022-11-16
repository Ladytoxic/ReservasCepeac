import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Reserva from 'src/app/Interface/reserva.interface';
import { DataService } from 'src/app/servicio/data.service';
import { CargaService } from '../pantalla-de-carga/carga.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  title = 'VARIETÉ x el Profesorado';
  descripcion = "Domingo 27 de Noviembre; en el marco de medidas de lucha contra los recortes educativos y el intento de transformar nuestro profesorado en un ciclo cerrado, varieteamos y nos organizamos en defensa de la educación pública.";
  fecha = "Domingo 27 de Noviembre";
  hora = "20hs: Cena | 20:30hs: Show"
  direccion = "Av. Alte. Brown 3589 - (Temperley)."
  reserva: any = [];
  id: any;
  constructor(
    private aRoute: ActivatedRoute,
    private cargando: CargaService,
    private toastr: ToastrService,
    private serv: DataService,
    private ruta: Router) {
    this.cargando.cargando();  }



  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.serv.obtenerReserva(this.id).subscribe(Response => {
      this.reserva = Response
      this.cargando.cargo()
    });
  }

  async borrarReserva(reserva: Reserva) {
    this.cargando.cargando();
    const resp = await this.serv.borrarReserva(reserva);
    this.ruta.navigate(['variete'])
    this.toastr.info('', 'Reserva Cancelada');
    this.cargando.cargo();
  }
}