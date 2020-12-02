import { Router } from '@angular/router';
import { ServicioService } from './../../servicios/servicio.service';
import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { HttpClient } from '@angular/common/http';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { observable, Observable, Subscriber } from 'rxjs';
import {Subject} from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from 'jquery';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EditarServicioService } from '../../servicios/editar-servicio.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbModalConfig, NgbModal,NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  imagesy = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/1600/350`);
  salir = false;
  pacientes: any;
  nombre: any;
  model: NgbDateStruct;
  CanbiarNombreVentana;
  NombreLogin;
  ssd:any
  RespuestaConsultaFecha:any
  eliminar=true
  CapturaImagen:any
  mostrar=false;
  mostrarZodiaco=false;
  myimage: Observable<any>;
  images:any
  public minDate: Date
  public maxDate: Date
  public value: Date
   cal:any
  datos: any;
  idDoctor;
  FechaCita;
  MotivoConsulta;
  NumeroSeguro;
  MontoPagado;
  Diagnostico;
  NotaConsulta;
  clave;
  correo;
  Abatar;
  sexo;
  ViejaContrasena:string=""
  NuevaContrasena:string=""
  VerificarCalave:string=""
  MensageCambioClave;
  fc;
  Msg;
  FechaFinal;
  Valor;
  idPaciente;
  ocurtar =true
  muestra=false
  ov="hola"
  constructor(configu: NgbCarouselConfig,public toastService: EditarServicioService,private ServicioService:ServicioService,private spinner: NgxSpinnerService, private http:HttpClient, config: NgbModalConfig, private modalService: NgbModal, private router:Router) {
    $(document).ready(function(){
      $('.nav_btn').click(function(){
        $('.mobile_nav_items').toggleClass('active');
      });
    });
    config.backdrop = 'static';
    config.keyboard = false;

    configu.interval = 1000;
    configu.wrap = false;
    configu.keyboard = false;
    configu.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.ServicioService.$getObjectSource.subscribe(data => {
      this.datos = data;
      this.idDoctor = this.datos.id
      this.pacientes = this.datos.pacientes;
       this.NombreLogin = this.datos.Nombre
       this.sexo = this.datos.Sexo
       if (this.pacientes==(0) || this.pacientes==undefined ) {
        this.ocurtar = false
        this.muestra = true
      } else {
       this.ocurtar = true
       this.muestra = false
      }
      console.log(this.datos.pacientes);
    });
    if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
    WebcamUtil.getAvailableVideoInputs()
    .then((mediaDevices: MediaDeviceInfo[]) => {
      this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    });
   this.sping()
   this.recarga()


  }
  recarga(){
    var carga = JSON.parse(localStorage.getItem('sesion'))
    this.correo= carga.correo
    this.clave= carga.clave
    this.sexo = carga.sexo
    this.http.get("https://finalapis.herokuapp.com/api/iniciar/"+this.correo+"/"+this.clave+"").subscribe(data=>{
      this.datos = data;
      this.idDoctor = this.datos.id
      this.pacientes = this.datos.pacientes;
       this.NombreLogin = this.datos.Nombre
       this.sexo = this.datos.Sexo
       if (this.pacientes==(0) || this.pacientes==undefined ) {
        this.ocurtar = false
        this.muestra = true
      } else {
       this.ocurtar = true
       this.muestra = false
      }
    });
    if (this.sexo=="Masculino") {
      this.Abatar="assets/bussiness-man.png"
    } else {
      this.Abatar="assets/businesswoman.png"
    }
  }


  openBackDropCustomClass(cambiarClave) {
    this.modalService.open(cambiarClave, {backdropClass: 'light-blue-backdrop'});
  }
  openBackDropCustom(cambiarNombreUsuario) {
    this.modalService.open(cambiarNombreUsuario, {backdropClass: 'light-blue-backdrop'});
  }
  openVerticall(verificar) {
    this.modalService.open(verificar, { centered: true });
  }
  openVerticalling(verificar2) {
    this.modalService.open(verificar2, { centered: true });
  }

comprobar(verificar){
if (this.ViejaContrasena=="" || this.ViejaContrasena==undefined || this.NuevaContrasena=="" || this.NuevaContrasena==undefined ) {
  this.CamposVacios()
} else {
 this.openVerticall(verificar)
}
}

  CambirPass(){
    if (this.ViejaContrasena=="" || this.ViejaContrasena==undefined || this.NuevaContrasena=="" || this.NuevaContrasena==undefined ) {
      this.CamposVacios()
    } else {
      if (this.clave == this.VerificarCalave) {
       if (this.VerificarCalave==""||this.VerificarCalave==undefined) {
        this.CamposVaciosPass()
       } else {
        this.http.get(" https://finalapis.herokuapp.com/api/ModClave/"+this.ViejaContrasena+"/"+this.idDoctor+"/"+this.NuevaContrasena+"").subscribe(data=>{
        this.MensageCambioClave=data
        Swal.fire(
          'Muy bien!',
          this.MensageCambioClave.respuesta,
          'success'
        )
        });
       }
      } else {
        this.ClavesIncorrectas()
      }
    }
  }

CambiarNombre(){
  if (this.ViejaContrasena=="" || this.ViejaContrasena==undefined || this.NuevaContrasena=="" || this.NuevaContrasena==undefined ) {
    this.CamposVacios()
  } else {
    if (this.clave == this.VerificarCalave) {
     if (this.VerificarCalave==""||this.VerificarCalave==undefined) {
     this.CamposVaciosPass()
     } else {
      this.http.get(" https://finalapis.herokuapp.com/api/modificar/"+this.ViejaContrasena+"/"+this.NuevaContrasena+"/"+this.idDoctor+"").subscribe(data=>{
      this.MensageCambioClave=data
      Swal.fire(
        'Muy bien!',
        this.MensageCambioClave.respuesta,
        'success'
      )
      });
     }
    } else {
     this.ClavesIncorrectas()
    }
  }
}

CerrarSesion(){
  localStorage.removeItem('sesion')
  localStorage.clear()
}


  sping(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
   }

  open(content) {
    this.modalService.open(content, {size:'xl'});
  }

  openVerticallyCentered(eliminar) {
    this.modalService.open(eliminar, { centered: true, backdropClass: 'light-blue-backdrop' });
  }
irARegistro(){
  this.qwwer()
  this.router.navigate(['registro'])
}
irAReporte(){
 this.qwwer()
  this.router.navigate(['reporte'])
}
CamposVacios(){
  Swal.fire(
    'Vaya!',
    'Los Campos de Incercion de Datos no Estar Vacios',
    'error'
  )
}

CamposVaciosPass(){
  Swal.fire(
    'Vaya!',
    'El Campo de Verificacion de Contraseña no Puede Estar Vacio',
    'error'
  )
}
ClavesIncorrectas(){
  Swal.fire(
    'Vaya!',
    'La Contraseña Digitada es Incorrecta',
    'error'
  )
}
qwwer(){
  let dt={
    id:this.idDoctor,
    sexo:this.sexo,
    nombre:this.NombreLogin
  }
  localStorage.setItem('llave',this.idDoctor)
  localStorage.setItem("id",JSON.stringify(dt))
}

  editarP(id,cedula,nombre,apellido,email,foto,nacido,sangre,alergia,zodiaco, idDoctor){
    let paciente={
      idPaciente:id,
      cedulaP:cedula,
      nombreP:nombre,
      apellidoP:apellido,
      emailP:email,
      fotoP:foto,
      nacidoP:nacido,
      Tsangre:sangre,
      alergiaP:alergia,
      zodiaco:zodiaco,
      idDoctores:idDoctor,
      sexo:this.sexo,
      NombreDoctor:this.NombreLogin,
    }
    localStorage.setItem('datosPacientes', JSON.stringify(paciente))
    this.ServicioService.enviarDatosEditar(paciente)
    this.router.navigate(['editar'])
  }

  irHome(){
    localStorage.removeItem('id')
    localStorage.removeItem('llave')
    this.router.navigate(['home'])
  }

  borrar(nombre, apellido,id){
    this.nombre = nombre + " " + apellido;
    this.idPaciente = id
  }
 nombres(nombre, apellido, id){
   this.CanbiarNombreVentana =nombre + " " + apellido;
   this.idPaciente = id
 }

 opening(camara) {
  this.modalService.open(camara, { size: 'lg' });
}



onChange($event: Event) {
  const file = ($event.target as HTMLInputElement).files[0];
  this.convertToBase64(file);
}

we(){
 console.log(this.model.day+'-'+this.model.month+'-'+this.model.year)
}


convertToBase64(file: File) {
 const observable= new Observable((subscriber: Subscriber<any>) => {
    this.readFile(file, subscriber);

  });
  observable.subscribe(data=>{
    this.CapturaImagen = data
     console.log(this.CapturaImagen)
   })
}
irAyuda(){
  this.router.navigate(['ayuda'])
}
recargar(){
  window.location.reload()
}
irNosotros(){
  this.router.navigate(['nosotros'])
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

CrearConsulta(){
  let dia = this.fc.day
  let mes = this.fc.month
  let año = this.fc.year
this.FechaFinal =dia +'-'+mes+'-'+año
 this.http.post("https://finalapis.herokuapp.com/api/Consulta/"+this.idPaciente+"/"+this.idDoctor+"/"+this.CanbiarNombreVentana+"/"+this.FechaFinal+"/"+this.MotivoConsulta+"/"+this.NumeroSeguro+"/"+this.MontoPagado+"/"+this.Diagnostico+"/"+this.NotaConsulta+"",{foto:this.CapturaImagen}).subscribe(data=>{
   this.Valor = data;
   this.Msg=this.Valor.respuesta
    this.MensageGuardado()
  })
}

EliminarPacienteConsulta(){
  this.http.delete("https://finalapis.herokuapp.com/api/EliminarPacienteConsulta/"+this.idPaciente+"").subscribe(data=>{
    this.Valor = data;
    this.Msg=this.Valor.respuesta
    this.MensageGuardado()
   });
}
showStandard() {
  this.toastService.show('I am a standard toast');
}

showSuccess(mgs) {
  this.toastService.show(mgs, { classname: 'bg-success text-light', delay: 10000 });
}

showDanger(dangerTpl) {
  this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
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
    title: 'Eliminacion de Pacientes',
    text: "Quieres eliminar este Paciente?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.EliminarPacienteConsulta()
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
