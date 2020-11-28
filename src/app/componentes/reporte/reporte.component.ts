import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import {NgbCalendar, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap'
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
sexo;
  constructor(private router:Router, private http:HttpClient,private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }

  ngOnInit(): void {
   this.idDoctor = localStorage.getItem('llave')
   this.ReporteCantidadVisita()
   this.ReporteZodiacal()
   this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
   this.user()
  }
  user(){
    this.usuario = JSON.parse(localStorage.getItem('id'))
    this.idDoctor = this.usuario.id
    this.nombreDoctor = this.usuario.nombre
    this.sexo = this.usuario.sexo
    if (this.sexo=="Masculino") {
      this.Abatar="../../../assets/bussiness-man.png"
    } else {
      this.Abatar="../../../assets/businesswoman.png"
    }
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
    localStorage.removeItem('id')
    localStorage.removeItem('llave')
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
}
