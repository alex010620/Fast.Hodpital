import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditarServicioService {
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  private objectSourceEditar = new BehaviorSubject<{}>({});
  $getObjectSourceEditar = this.objectSource.asObservable();
  constructor() { }

  enviar(data:any){
    this.objectSource.next(data)
  }
  enviarDatosEditar(data:any){
    this.objectSourceEditar.next(data)
  }

}
