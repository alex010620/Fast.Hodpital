import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { ServicioService } from './servicios/servicio.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {
  datos:any
  constructor(private servicio:ServicioService, private router:Router){ this.gf()}
  gf(){
    this.servicio.$getObjectSource.subscribe(data=>{
     this.datos = data
    })
  }
  canActivate():boolean{
   if (this.datos==(0)) {
     this.router.navigate(['login'])
     return false
   } else {
     return true
   }
  }

}
