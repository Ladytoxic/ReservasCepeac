import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaService {
  cargando$ = new Subject<boolean>();

  cargando(): void {
    this.cargando$.next(true);
  }

  cargo(): void {
    this.cargando$.next(false);
  }
}
