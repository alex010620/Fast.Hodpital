import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fash Hospital';
  salir='mobile_nav_items'
ver=false


constructor(private spinner: NgxSpinnerService, private router:Router){

}

ngOnInit(){
 this.sping();
}
 sping(){
  this.spinner.show();
  setTimeout(() => {
    this.spinner.hide();
  }, 1000);
 }

sacar(){
  if (!this.ver) {
    this.salir='mobile_nav_items'
  } else {
    this.salir='active'
  }

}
irHome(){
  this.router.navigate(['home'])
}
irARegistro(){
  this.router.navigate(['registro'])
}
irAReporte(){
  this.router.navigate(['reporte'])
}
CerrarSesion(){
  localStorage.removeItem('sesion')
  localStorage.clear()
}
}
