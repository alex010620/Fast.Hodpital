import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { observable, Observable, Subscriber } from 'rxjs';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario;
  nombreDoctor;
  idDoctor;
  Abatar;
  sexo;
  TSexo;
  model: NgbDateStruct;
  eliminar=true
  CapturaImagen:any
  mostrar=false;
  Zodiaco;
  Sangre;
  Nombre:string=""
  apellido:string=""
  email:string=""
  FechaNacimeinto;
  alergias:string=""
  Cedula:string=""
  ReorganizarFecha;
  Central;
  autoComplit;
  Msg;
  Foto = "../../../assets/picture.png"
  constructor(private router:Router,private http:HttpClient, private modalService: NgbModal) {

    $(document).ready(function(){
      $('.nav_btn').click(function(){
        $('.mobile_nav_items').toggleClass('active');
      });
    });
   }
  //node server.js
  ngOnInit(): void {
    this.user()
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
  LeerZodiaco(){
  this.Zodiaco
  }
  LeerSangre(){
 this.Sangre
  }
  LeerSexo(){
    this.TSexo
  }
  opening(camara) {
    this.modalService.open(camara, { size: 'lg' });
  }
  irAyuda(){
    this.router.navigate(['ayuda'])
  }
  irNosotros(){
    this.router.navigate(['nosotros'])
  }
  autoCompletar(event){
    this.http.get("https://api.adamix.net/apec/cedula/"+event.target.value+"").subscribe(data=>{
      this.autoComplit = data
      this.Nombre = this.autoComplit.Nombres
      this.apellido = this.autoComplit.Apellido1
      this.CapturaImagen = this.autoComplit.foto
    })
  }
  Registrar(){
    if (this.Nombre==""||this.Nombre==undefined||this.Cedula==""||this.Cedula==undefined||this.apellido==""||this.apellido==undefined||this.email==""||this.email==undefined) {
      Swal.fire(
        'Vaya!',
        'No se puede hacer el registro si hay campos vacios.',
        'error'
      )
    } else {
      let dia = this.FechaNacimeinto.day
      let mes = this.FechaNacimeinto.month
      let año = this.FechaNacimeinto.year
     this.ReorganizarFecha = dia +'-'+mes+'-'+año

      this.Foto =""
     this.http.post("https://finalapis.herokuapp.com/api/Pacientes/"+this.idDoctor+"/"+this.Cedula+"/"+this.Nombre+"/"+this.apellido+"/"+this.Sangre+"/"+this.email+"/"+this.TSexo+"/"+this.ReorganizarFecha+"/"+this.alergias+"/"+this.Zodiaco+"",{foto:this.CapturaImagen}).subscribe(data=>{
     this.Central = data
     this.Msg=this.Central.respuesta
      this.MensageGuardado()
     })
    }
  }
  MensageGuardado(){
    Swal.fire({
      title: 'Muy bien!',
      text: ""+this.Msg+"!",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
       window.location.reload()
      }
    })

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
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe(data=>{
     this.CapturaImagen = data
      console.log(this.CapturaImagen)
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

public showWebcam = true;
public allowCameraSwitch = true;
public multipleWebcamsAvailable = false;
public deviceId: string;
public videoOptions: MediaTrackConstraints = {
  // width: {ideal: 1024},
  // height: {ideal: 576}
};
public errors: WebcamInitError[] = [];

// latest snapshot
public webcamImage: WebcamImage = null;

// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();
// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();



public triggerSnapshot(): void {
  this.trigger.next();
}

public toggleWebcam(): void {
  this.mostrar=true
  this.eliminar =false
  this.showWebcam = this.showWebcam;
}

public handleInitError(error: WebcamInitError): void {
  this.errors.push(error);
}

public showNextWebcam(directionOrDeviceId: boolean|string): void {
  this.nextWebcam.next(directionOrDeviceId);
}

public handleImage(webcamImage: WebcamImage): void {
  this.webcamImage = webcamImage;
//Recuerda que esto es lo que hace el base64
  this.CapturaImagen = webcamImage.imageAsDataUrl
  console.log(webcamImage.imageAsDataUrl)
}
limpiar(){
  this.CapturaImagen=""
  this.toggleWebcam();
}
public cameraWasSwitched(deviceId: string): void {
  this.deviceId = deviceId;
}

public get triggerObservable(): Observable<void> {
  return this.trigger.asObservable();
}

public get nextWebcamObservable(): Observable<boolean|string> {
  return this.nextWebcam.asObservable();
}
}
