import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservarComponent } from './componente/reservar/reservar.component';
import { InfoComponent } from './componente/info/info.component';
import { PantallaDeCargaComponent } from './componente/pantalla-de-carga/pantalla-de-carga.component';

const routes: Routes = [
  { path: 'variete', component: ReservarComponent },
  { path: 'variete/end/:id', component: InfoComponent },
  { path: '', redirectTo: 'variete', pathMatch: 'full' },
  { path: '**', component: ReservarComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
