import {RouterModule, Routes} from '@angular/router'
import { EditarComponent } from './componentes/editar/editar.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReporteComponent } from './componentes/reporte/reporte.component';


const app_routes: Routes= [
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent},
  {path: 'editar', component: EditarComponent },
  {path: 'registro', component: RegistroComponent},
  {path: 'reporte', component: ReporteComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'login'},
]

export const app_routing = RouterModule.forRoot(app_routes);
