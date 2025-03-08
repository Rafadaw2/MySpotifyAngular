import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

export interface Cancion{
  id: number;
  titulo: string;
  likes: number;
  ruta: string;

}

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
 canciones:Cancion[]=[];
 cancionesFiltradas:Cancion[]=[];
 filtro:string='';

 constructor(private http: HttpClient){}

  obtenerCanciones(){
    if (this.canciones.length==0){
      this.http.get<Cancion[]>('http://localhost:8000/cancionJson')
        .subscribe(data=>{
          this.canciones=data
          console.log(this.canciones)
          this.filtrarCanciones()
        })
    }else{
      console.log(this.canciones)
      this.filtrarCanciones()
    }
  }
  filtrarCanciones(){
    this.cancionesFiltradas=this.canciones.filter(cancion=>
      cancion.titulo.toLowerCase().includes(this.filtro.toLowerCase())
    )
  }
}
