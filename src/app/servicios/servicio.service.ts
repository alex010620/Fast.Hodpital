import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  private objectSourceEditar = new BehaviorSubject<{}>({});
  $getObjectSourceEditar = this.objectSourceEditar.asObservable();
  constructor(private http:HttpClient) { }

  enviar(data:any){
    this.objectSource.next(data)
  }
  enviarDatosEditar(data:any){
    this.objectSourceEditar.next(data)
  }

  getJson(url: string){
    return  this.http.get(url);
  }
}
