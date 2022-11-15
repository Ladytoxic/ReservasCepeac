import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicio/alert.service';
import { DataService } from 'src/app/servicio/data.service';
import { CargaService } from '../pantalla-de-carga/carga.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  title = 'VARIETÉ x el Profesorado';
  descripcion = "Domingo 27 de Noviembre; en el marco de medidas de lucha contra los recortes educativos y el intento de transformar nuestro profesorado en un ciclo cerrado, varieteamos y nos organizamos en defensa de la educación pública.";
  fecha = "20:00 hs: Cena";
  hora = "21:00 hs: Show"
  formReserva!: FormGroup;
  resp: any;
  constructor(
    private FormBuilder: FormBuilder,
    private cargando: CargaService,
    private reservar: DataService,
    private ruta: Router,
    private toast: AlertService,
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
        this.toast.correct('', 'Reserva Realizada');
        let param = {
          email: this.formReserva.value.email,
          asunto: 'Hola ' + this.formReserva.value.nombre + '! "Tu Reserva ha sido realiza Correctamente"',
          html: `
              <div> 
              <h1>Hola 👋 ${this.formReserva.value.nombre}!</h1>
              <h2>Tu reserva ha sido realizada correctamente</h2><hr>
              <p><b>ID de reserva:</b> ${data.id}</p>
              <p><b>Nombre:</b> ${this.formReserva.value.nombre}</p>
              <p><b>Cantidad:</b> ${this.formReserva.value.cantidad}</p><br>
              <p>En caso de no poder ir puedes cancelar tu reserva haciendo click en este enlace </p>
              <a href="https://cepeac.web.app/variete/end/${data.id}">https://cepeac.web.app/variete/end/${data.id}</a>
              <hr>
              <p>Te esperamos el día ${this.fecha}</p>
              <p><b>OTRO MUNDO (TEATRO- BAR)</b></p>
              <p>(Av. Alte. Brown 3589 - Temperley)</p>
              </div>`}
        this.http.post('https://cepeac.up.railway.app/envio', param).subscribe(resp => { });
        console.log('esta es la data de id: ' + data.id)
        // this.ruta.navigate(['teatrointimo/end/' + data.id])
        this.cargando.cargo();
      }).catch(error => {
        this.toast.incorrect('', 'Reserva No Realizada')
        console.log(error);
        this.cargando.cargo
      });

  }

}
