import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  usuario;
  nombreDoctor;
  sexo;
  Abatar;
  constructor(private http:HttpClient, private router: Router) {
  $(document).ready(function(){
    $('.nav_btn').click(function(){
      $('.mobile_nav_items').toggleClass('active');
    });
  });


  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('sesion'))
    this.nombreDoctor = this.usuario.nombre
    this.sexo = this.usuario.sexo
    if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
    this.user();
  }


  user(){
    this.usuario = JSON.parse(localStorage.getItem('id'))
    this.nombreDoctor = this.usuario.nombre
    this.sexo = this.usuario.sexo
    if (this.sexo=="Masculino") {
      this.Abatar="../../../assets/bussiness-man.png"
    } else {
      this.Abatar="../../../assets/businesswoman.png"
    }
  }
  irAReporte(){
     this.router.navigate(['reporte'])
   }
   irARegistro(){
    this.router.navigate(['registro'])
  }
  irHome(){
    localStorage.removeItem('id')
    localStorage.removeItem('llave')
    this.router.navigate(['home'])
  }
  irAyuda(){
    this.router.navigate(['ayuda'])
  }
  irNosotros(){
    this.router.navigate(['nosotros'])
  }
}
