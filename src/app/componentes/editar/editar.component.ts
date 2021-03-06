import { ServicioService } from './../../servicios/servicio.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { data } from 'jquery';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { observable, Observable, Subscriber } from 'rxjs';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.componet.css']
})
export class EditarComponent implements OnInit {
  public isCollapsed = false;

  myimage: Observable<any>;
  globales:any
  idPaciente:any
  idDoctor:any
  nombreDoctor:string
  cedula;
  mostrar=false;
  CapturaImagen:any
  FechaNacimiento;
  Alergias;
  Sangre;
  NombreApellido;
  email;
  usuario;
  DatosCita:any

 Abatar;
 sexo;
//Variables Consulta
FechaCita;
mos=false
mostr=true
MotivoConsulta;
NumeroSeguro;
MontoPagado;
Diagnostico;
NotaConsulta;
Repartir:any
text1: boolean = true
apellidoP;
nombreP;
zodiaco;
boton=false
boton2=true
Valor;
FechaFinal;
Msg;
Capturar;
fc;
idConsulta;
Foto="../../../assets/man.png"
  constructor(private ServicioService:ServicioService, private http:HttpClient, config: NgbModalConfig, private modalService: NgbModal, private router:Router) {
    $(document).ready(function(){
      $('.nav_btn').click(function(){
        $('.mobile_nav_items').toggleClass('active');
      });
    });
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(){
    this.ServicioService.$getObjectSourceEditar.subscribe(data=>{
     this.globales = data
     this.idPaciente = this.globales.idPaciente
     this.nombreDoctor = this.globales.NombreDoctor
     this.cedula = this.globales.cedulaP
     this.NombreApellido = this.globales.nombreP +" "+ this.globales.apellidoP
     this.nombreP=this.globales.nombreP
     this.apellidoP =this.globales.apellidoP
     this.email = this.globales.emailP
     this.Alergias= this.globales.alergiaP
     this.FechaNacimiento = this.globales.nacidoP
     this.Sangre = this.globales.Tsangre
     this.sexo = this.globales.sexo
     this.zodiaco = this.globales.zodiaco
     this.Capturar = this.globales.fotoP
     this.CapturaImagen = this.globales.fotoP
     if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
    });

    this.http.get("https://finalapis.herokuapp.com/api/SeleccionarConsulta/"+this.idPaciente+"").subscribe(data=>{
   this.DatosCita = data
    })

    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
    this.recarga()
    this.user()


  }
  user(){
    this.usuario = JSON.parse(localStorage.getItem('id'))
    this.nombreDoctor = this.usuario.nombre
    this.sexo = this.usuario.sexo
    if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
  }
 recarga(){
   var gf = JSON.parse(localStorage.getItem('datosPacientes'))
   this.idPaciente = gf.idPaciente
     this.nombreDoctor = gf.NombreDoctor
     this.cedula = gf.cedulaP
     this.NombreApellido = gf.nombreP +" "+ gf.apellidoP
     this.nombreP=gf.nombreP
     this.apellidoP =gf.apellidoP
     this.email = gf.emailP
     this.Alergias= gf.alergiaP
     this.FechaNacimiento = gf.nacidoP
     this.Sangre = gf.Tsangre
     this.sexo = gf.sexo
     this.zodiaco = gf.zodiaco
     this.Capturar = gf.fotoP
     this.CapturaImagen = gf.fotoP
     this.http.get("https://finalapis.herokuapp.com/api/SeleccionarConsulta/"+this.idPaciente+"").subscribe(data=>{
      this.DatosCita = data
       });
      if (this.sexo=="Masculino") {
        this.Abatar="assets/bussiness-man.png"
      } else {
        this.Abatar="assets/businesswoman.png"
      }
 }
ocurtar(){

  document.getElementById('e').style.display="block"
  document.getElementById('d').style.display="none"
}

ocurtacion(){
  document.getElementById('e').style.display="none"
  document.getElementById('d').style.display="block"
}
cd(){
  var bv = JSON.parse(localStorage.getItem('datosPacientes'))
  this.idPaciente= bv.idPaciente
  this.idDoctor = bv.idDoctores
}
 CargarDatosEdicionConsulta(id){
   this.http.get("https://finalapis.herokuapp.com/api/SeleccionarConsultaUnica/"+id+"").subscribe(data=>{
     this.Repartir = data
      this.FechaCita = this.Repartir.fecha
      this.MotivoConsulta = this.Repartir.motivoConsulta
      this.NumeroSeguro = this.Repartir.numeroSeguro
      this.MontoPagado = this.Repartir.montoPagado
      this.Diagnostico = this.Repartir.diagnostico
      this.NotaConsulta = this.Repartir.nota
      this.idConsulta = id
      this.CapturaImagen = this.Repartir.evidencia
   })
 }
  limpiarActualizacion(){
    this.FechaCita =""
    this.MotivoConsulta =""
    this.NumeroSeguro =""
    this.MontoPagado =""
    this.Diagnostico =""
    this.NotaConsulta =""
  }
   CrearConsulta(){
     if (this.fc == (0) || this.MotivoConsulta == undefined ||  this.MotivoConsulta =="" || this.NotaConsulta==undefined|| this.NotaConsulta =="") {
      Swal.fire(
        'Vaya!',
        'Al parecer no lleno todos los campos requeridos!',
        'warning'
      )
     } else {
      this.cd()
      let dia = this.fc.day
      let mes = this.fc.month
      let año = this.fc.year
    this.FechaFinal =dia +'-'+mes+'-'+año
     this.http.post("https://finalapis.herokuapp.com/api/Consulta/"+this.idPaciente+"/"+this.idDoctor+"/"+this.NombreApellido+"/"+this.FechaFinal+"/"+this.MotivoConsulta+"/"+this.NumeroSeguro+"/"+this.MontoPagado+"/"+this.Diagnostico+"/"+this.NotaConsulta+"",{foto:this.CapturaImagen}).subscribe(data=>{
       this.Valor = data;
       this.Msg=this.Valor.respuesta
       this.MensageGuardado()
      })
     }
   }
 // RECUERDA QUE LE CAMBIASTE A POST ANTERIORMENTE
   ActualizarConsulta(){
    this.cd()
    let dia = this.fc.day
    let mes = this.fc.month
    let año = this.fc.year
  this.FechaFinal =dia +'-'+mes+'-'+año
   this.http.put("https://finalapis.herokuapp.com/api/ActualizarConsulta/"+this.idConsulta+"/"+this.NombreApellido+"/"+this.FechaFinal+"/"+this.MotivoConsulta+"/"+this.NumeroSeguro+"/"+this.MontoPagado+"/"+this.Diagnostico+"/"+this.NotaConsulta+"",{foto:this.CapturaImagen}).subscribe(data=>{
     this.Valor = data;
     this.Msg=this.Valor.respuesta
      this.MensageGuardado()
    });
  }

  ActualizarDatosPacientes(){
   this.http.put("https://finalapis.herokuapp.com/api/ActualizarPaciente/"+this.idPaciente+"/"+this.cedula+"/"+this.nombreP+"/"+this.apellidoP+"/"+this.Sangre+"/"+this.email+"/"+this.sexo+"/"+this.FechaNacimiento+"/"+this.Alergias+"/"+this.zodiaco+"",{foto:this.CapturaImagen}).subscribe(data=>{
    this.Valor = data;
    this.Msg=this.Valor.respuesta
      this.MensageGuardado()
   })
  }
  tenporal(id){
    this.idConsulta = id
  }
  EliminarConsulta(){
    this.http.delete("https://finalapis.herokuapp.com/api/EliminarConsulta/"+this.idConsulta+"").subscribe(data=>{
      this.Valor = data;
      this.Msg=this.Valor.respuesta
      this.MensageGuardado()
     });
  }

  irHome(){
    this.router.navigate(['home'])
  }
  openVerticallyCentered(eliminar) {
    this.modalService.open(eliminar, { centered: true });
  }
  irAyuda(){
    this.router.navigate(['ayuda'])
  }
  irNosotros(){
    this.router.navigate(['nosotros'])
  }
  open(citas) {
    this.modalService.open(citas, {size:'xl'});
    this.CapturaImagen ="../../../assets/pacient.png"
  }

  openActualizar(Actualizarcitas) {
    this.modalService.open(Actualizarcitas, {size:'xl'});
  }
  Vistageneral(VistaGeneral) {
    this.modalService.open(VistaGeneral, {size:'xl'});
  }

  ActualizarPacientes(ActualizarPaciente) {
    this.modalService.open(ActualizarPaciente, { size: 'lg' });
  }
  //FUNCIONES PARA LA CAMARA Y CONVERCIONES A BASE 64

  //Habre el modal donde esta colocada la camara
  opening(camara) {
    this.modalService.open(camara, { size: 'lg' });
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

//Alertas
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

 Eliminacion(){
  Swal.fire({
    title: 'Eliminacion de Conssulta',
    text: "Quieres eliminar esta consulta?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.EliminarConsulta()
    }
  })
 }
//Fin de las alerrtas

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
