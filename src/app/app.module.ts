import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { app_routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WebcamModule } from 'ngx-webcam';
import { NgxSpinnerModule } from "ngx-spinner";
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReporteComponent } from './componentes/reporte/reporte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EditarComponent,
    RegistroComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    NgbModule,
    WebcamModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
