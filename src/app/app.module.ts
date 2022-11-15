import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ReservarComponent } from './componente/reservar/reservar.component';
import { InfoComponent } from './componente/info/info.component';
import { FooterComponent } from './componente/footer/footer.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { PantallaDeCargaComponent } from './componente/pantalla-de-carga/pantalla-de-carga.component';
import { InterceptorInterceptor } from './componente/pantalla-de-carga/interceptor.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouserComponent } from './componente/carouser/carouser.component';
import { CartelneonComponent } from './componente/cartelneon/cartelneon.component';
import { CartelneonsubtComponent } from './componente/cartelneonsubt/cartelneonsubt.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservarComponent,
    InfoComponent,
    FooterComponent,
    PantallaDeCargaComponent,
    CarouserComponent,
    CartelneonComponent,
    CartelneonsubtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
