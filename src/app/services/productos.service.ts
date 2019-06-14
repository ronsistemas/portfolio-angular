import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  response: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise(( resolve, reject ) => {
      this.http.get('https://angular-portfolio-f4941.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.response = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

    getProducto( id: string ) {
      return this.http.get(`https://angular-portfolio-f4941.firebaseio.com/productos/${ id }.json`);
    }

    buscarProducto( termino: string ) {
      if( this.response.length === 0 ) {
        // Cargar productos
        this.cargarProductos().then( () => {
          // Ejecutar después de tener los productos
          // Aplicar el filtro
          this.filtrarProductos( termino );
        });
      } else {
        // Aplicar filtro
        this.filtrarProductos( termino );
      }


      console.log(this.productosFiltrado);
    }

    private filtrarProductos( termino: string ) {
      console.log(this.response);
      this.productosFiltrado = [];

      termino = termino.toLocaleLowerCase();

      this.response.forEach( prod => {
        const tituloLower = prod.titulo.toLocaleLowerCase();

        if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino) >= 0) {
          this.productosFiltrado.push( prod );
        }
      });
    }
}
