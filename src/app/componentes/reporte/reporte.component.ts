import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import {NgbCalendar, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
idDoctor:any
cantidadVisita:any
Zodiaco
model1: string;
model2: string;
nombreDoctor;
usuario;
Abatar;
fechaReporte;
sexo;
reporteFechas;
fecha;
fha;
convert;
  constructor(private router:Router, private http:HttpClient,private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) {
    $(document).ready(function(){
      $('.nav_btn').click(function(){
        $('.mobile_nav_items').toggleClass('active');
      });
    });
   }

  ngOnInit(): void {
   this.idDoctor = localStorage.getItem('llave')
   this.ReporteCantidadVisita()
   this.ReporteZodiacal()
   this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
   this.user()
   if(this.idDoctor == undefined || this.idDoctor=="", this.idDoctor==null){
    this.router.navigate(['login'])
    }
  }
  user(){
    this.usuario = JSON.parse(localStorage.getItem('id'))
    this.idDoctor = this.usuario.id
    this.nombreDoctor = this.usuario.nombre
    this.sexo = this.usuario.sexo
    if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
    if(this.idDoctor == undefined || this.idDoctor=="", this.idDoctor==null){
      this.router.navigate(['login'])
      }
  }
  irAyuda(){
    this.router.navigate(['ayuda'])
  }
  irNosotros(){
    this.router.navigate(['nosotros'])
  }
 ReporteCantidadVisita(){
   this.http.get("https://finalapis.herokuapp.com/api/idDoctor/"+this.idDoctor+"").subscribe(data=>{
    this.cantidadVisita= data
   })
 }
 ReporteZodiacal(){
  this.http.get("https://finalapis.herokuapp.com/api/zodiaco/"+this.idDoctor+"").subscribe(data=>{
   this.Zodiaco= data
  })
}

readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }



  irHome(){
    this.router.navigate(['home'])
  }
  irARegistro(){
    this.qwwer()
    this.router.navigate(['registro'])
  }
  irAReporte(){
   this.qwwer()
    this.router.navigate(['reporte'])
  }

  qwwer(){
    let dt={
      id:this.idDoctor,
      sexo:this.sexo,
      nombre:this.nombreDoctor
    }
    localStorage.setItem('llave',this.idDoctor)
    localStorage.setItem("id",JSON.stringify(dt))
  }

 ReporteFecha(){
   if(this.fha === undefined){
    Swal.fire(
      'Vaya!',
      'Al parecer no selecciono una fecha. Seleccione una!',
      'warning'
    )
  }else{
    var dia = this.fha.day
    var mes = this.fha.month
    var año = this.fha.year
    this.fecha = dia +'-'+mes+'-'+año
    let idD = parseInt(this.idDoctor)
   this.http.get("https://finalapis.herokuapp.com/api/fecha/"+this.fecha+"/{id}?idDoctor="+idD+"").subscribe(data=>{
    this.convert = data
    if(this.convert==(0)){
      Swal.fire(
        'Vaya!',
        "No Pudimos Encontrar la Fecha del "+this.fecha+" en Nuestra Base de Datos, Verifique si es Correta!",
        'warning'
      )
    }
  })
  }
 }

}
