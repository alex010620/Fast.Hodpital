import { Router } from '@angular/router';
import { ServicioService } from './../../servicios/servicio.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nombre: string = '';
  correo: string = '';
  clave: string = '';
  sexo: string = '';
  convert: any;
  Sexo2;
  NombreD;
  constructor(private Http:HttpClient, private ServicioService:ServicioService, private router:Router) {}

  ngOnInit(): void {

         const sign_in_btn = document.querySelector("#sign-in-btn");
         const sign_up_btn = document.querySelector("#sign-up-btn");
         const container = document.querySelector(".containerm");
         sign_up_btn.addEventListener("click", () => {
           container.classList.add("sign-up-mode");
         });

         sign_in_btn.addEventListener("click", () => {
           container.classList.remove("sign-up-mode");
         });
  }

  iniciar() {
    if (this.correo == '' || this.clave == '') {
      Swal.fire(
        'Vaya!',
        'Los Campos de Inicio de Sesion estan Vacios',
        'error'
      )
    } else {
      this.Http.get("https://finalapis.herokuapp.com/api/iniciar/"+this.correo+"/"+this.clave+"").subscribe(data=>{
        this.convert = data;
        this.Sexo2 = this.convert.Sexo
        this.NombreD = this.convert.Nombre
      if (this.convert.Ok == false) {
        Swal.fire(
          'Vaya!',
          'Al Parecer los Datos Ingresados son Incorrectos',
          'warning'
        )
      } else {
        var log={
          correo:this.correo,
          clave:this.clave,
          sexo:this.Sexo2,
          nombre:this.NombreD
        }
        localStorage.clear()
        localStorage.setItem('sesion', JSON.stringify(log))
        this.ServicioService.enviar(this.convert)
        this.router.navigate(['home'])
      }
    })
    }
  }

  registrar(){
    if (this.nombre == '' || this.correo == '' || this.clave == '' || this.sexo == '') {
      Swal.fire(
        'Vaya!',
        'Los Campos de Registro estan Vacios',
        'error'
      )
    } else {
    this.Http.get("https://finalapis.herokuapp.com/api/crear/"+this.nombre+"/"+this.correo+"/"+this.clave+"/"+this.sexo+"").subscribe(data=>{
      console.log(this.sexo);
      this.convert = data;
      Swal.fire(
        'Muy bien!',
        this.convert.respuesta,
        'success'
      )
  })
    }
  }
}
