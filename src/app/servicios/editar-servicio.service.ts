import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditarServicioService {
  toasts: any[] = [];
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

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

}
