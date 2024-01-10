import { Component } from '@angular/core';

import { EducationService } from './services/education.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'software-page';
  nombresCursos: string[] = [];
  dataCursos: any[] = [];
  mostrarLogin = false;
  mostrarLinks = false;
  resultadosBusquedas: string[] = [];
  txtBuscar: string = "Cuéntanos aquí...";
  nombreUsuario: string = '';
  mostrarNombre: boolean = false;

  constructor(
    private education: EducationService,
    private auth: AuthService) { 
    this.searchCursos();
  }

  ngOnInit(): void {
    this.auth.obtenerEventoObservable().subscribe(
      (mensaje: string) => {
        console.log("Se recibe el evento!!! ", mensaje);
        this.nombreUsuario = mensaje;
        this.mostrarNombre = true;
      }
    );
    this.auth.obtenerEventoLoginObservable().subscribe(
      (showLogin: boolean) => {
        this.mostrarLogin = showLogin;
      }
    );
  }

  searchEducation() {
    this.resultadosBusquedas = [];
    this.education.obtenerDatos().subscribe(
      (datos) => {
        console.log('Datos recibidos:', datos);
        datos.forEach((element: any) => {
          console.log('Cursos: ', element.nombre);
          const input = document.getElementById('search-input') as HTMLInputElement;
          const value = input?.value;
          console.log('Compare: ', value)
          if(element.nombre.includes(value)) {
            console.log('Cumple');
            this.resultadosBusquedas.push(element.nombre);
          }
        });
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
    this.education.obtenerDatosIns().subscribe(
      (datos) => {
        console.log('Datos recibidos:', datos);
        datos.forEach((element: any) => {
          const input = document.getElementById('search-input') as HTMLInputElement;
          const value = input?.value;
          if(element.nombre.includes(value)) {
            this.resultadosBusquedas.push(element.nombre);
          }
        });
        setTimeout(() => {
          console.log('Resultados: ', this.resultadosBusquedas);
          this.mostrarLinks = true;
        }, 1000);
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  searchCursos() {
    this.education.obtenerCursos().subscribe(
      (datos) => {
        console.log('Datos: ', datos);
        this.dataCursos = datos;
        datos.forEach((element: any) => {
          this.nombresCursos.push(element.nombre);
        });
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  showLogin() {
    this.mostrarLogin = true;
  }
}

