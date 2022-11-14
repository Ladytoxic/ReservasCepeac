import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toast: ToastrService) { }
  correct(texto: string | undefined, titulo: string | undefined){
    this.toast.success(texto, titulo);
  }

  incorrect (texto: string | undefined, titulo: string | undefined){
    this.toast.error(texto,titulo);
  }
}
