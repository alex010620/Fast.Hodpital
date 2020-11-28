import {RouterModule, Routes} from '@angular/router'
import { AyudaComponent } from './componentes/ayuda/ayuda.component';
import { EditarComponent } from './componentes/editar/editar.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MantenimientoComponent } from './componentes/mantenimiento/mantenimiento.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ReporteComponent } from './componentes/reporte/reporte.component';


const app_routes: Routes= [
  {path: 'mantenimiento', component: MantenimientoComponent},
  //{path: 'login', component: LoginComponent },
  //{path: 'home', component: HomeComponent},
  //{path: 'editar', component: EditarComponent },
  //{path: 'registro', component: RegistroComponent},
  //{path: 'reporte', component: ReporteComponent},
  //{path: 'ayuda', component: AyudaComponent},
  //{path: 'nosotros', component: NosotrosComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'mantenimiento'},
]

export const app_routing = RouterModule.forRoot(app_routes);
