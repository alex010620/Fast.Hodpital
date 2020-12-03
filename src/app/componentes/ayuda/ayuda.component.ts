import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
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
    if(this.nombreDoctor == undefined || this.nombreDoctor=="null", this.nombreDoctor==null){
      this.router.navigate(['login'])
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
    if(this.nombreDoctor == undefined || this.nombreDoctor=="",this.nombreDoctor =="null", this.nombreDoctor===null){
      this.router.navigate(['login'])
      }
  }
  irHome(){
    this.router.navigate(['home'])
  }

  irAyuda(){
    this.router.navigate(['ayuda'])
  }

}
