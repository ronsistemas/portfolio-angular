import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  response: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get('https://angular-portfolio-f4941.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      this.response = resp;
      this.cargando = false;
    });
  }

}
