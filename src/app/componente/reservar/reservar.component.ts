import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicio/data.service';
import { CargaService } from '../pantalla-de-carga/carga.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  title = 'CICLO DE TEATRO ÍNTIMO';
  descripcion = "Varias escenas comprometidas para un público reducido, donde lxs espectadores rodean el escenario para ser testigos directos y poder sentirse a solas con les personajes, viviendo el teatro a flor de piel.";
  fecha = "Sábado 22 de Octubre a las 21:30 hs.";
  formReserva!: FormGroup;
  resp: any;
  constructor(
    private FormBuilder: FormBuilder,
    private cargando: CargaService,
    private reservar: DataService,
    private ruta: Router,
    private toastr: ToastrService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.formReserva = this.FormBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cantidad: ['1'],
      fechaCreacion: new Date
    });
  }
  enviar(): void {
    this.cargando.cargando();
    this.reservar.agregarReserva(this.formReserva.value)
      .then((data) => {
        this.toastr.success('', 'Reserva Realizada');
        let param = {
          email: this.formReserva.value.email,
          asunto: 'Hola ' + this.formReserva.value.nombre + '! "Tu Reserva ha sido realiza Correctamente"',
          html: `
              <div> 
              <h1>Hola 👋 ${this.formReserva.value.nombre}!</h1>
              <h2>Tu reserva ha sido realizada correctamente</h2><hr>
              <p>ID de reserva: ${data.id}</p>
              <p>Nombre: ${this.formReserva.value.nombre}</p>
              <p>Email: ${this.formReserva.value.email}</p>
              <p>Cantidad: ${this.formReserva.value.cantidad}</p><br>
              <p>En caso de no poder ir puedes cancelar tu reserva haciendo click en este enlace </p>
              <a href="https://laterraza.netlify.com/teatrointimo/end/${data.id}">https://laterraza.netlify.com/teatrointimo/end/${data.id}</a>
              <hr>
              <p>Te esperamos el día ${this.fecha}</p>
              <p><b>En el Centro cultural La Terraza</b></p>
              <p>(Av. Aviación 690 1er piso - Longchamps)</p>
              </div>`}
        this.http.post('https://mailreserva-production.up.railway.app/envio', param).subscribe(resp => { });
        console.log('esta es la data de id: ' + data.id)
        this.ruta.navigate(['teatrointimo/end/' + data.id])
        this.cargando.cargo();
      }).catch(error => {
        this.toastr.error('', 'Reserva No Realizada')
        console.log(error);
        this.cargando.cargo
      });

  }

}
