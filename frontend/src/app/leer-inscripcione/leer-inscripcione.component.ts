import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';
import { ImpresionService } from '../impresion.service';

@Component({
  selector: 'app-leer-inscripcione',
  templateUrl: './leer-inscripcione.component.html',
  styleUrls: ['./leer-inscripcione.component.css']
})
export class LeerInscripcioneComponent implements OnInit {

  readData: any;
  values = '';
  constructor(private servise: ApiserviceService, private router: Router, private srvImpresion: ImpresionService) { }

  ngOnInit(): void {
    this.getAllData();
    console.log(this.readData);
  }
  imprimir() {
    this.servise.InscripcionesImprimir("a").subscribe(res => {
      console.log(res.data, 'res==>');

      const encabezado = [
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Apellidos', dataKey: 'apellido' },
        { header: 'Estado', dataKey: 'estado' },
        { header: 'Curso', dataKey: 'nombreCorto' },
        { header: 'Telefono', dataKey: 'telefono' },
        { header: 'Ciudad', dataKey: 'ciudad' },
      ];
      const cuerpo = res.data

      this.readData = res;
      this.srvImpresion.imprimir(encabezado, cuerpo, "Lista de estudiantes inscritos", true);
    })
    //const encabezado=["nombre","apellido","celular","correo"];
    //const cuerpo=this.readData;
    // this.srvImpresion.imprimir(encabezado,cuerpo,"lista de inscritos",true);
  }
  getAllData() {
    this.servise.InscripcionesImprimir("1").subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    })
  }
  deleteID(id: any) {
    this.servise.inscripcionDelete(id).subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    })
    this.getAllData();
  }
  downData(id: any, nombre: any) {

  }
  upData(id: any, nombre: any) {

  }
  onKey(event: any) {
    console.log(event.target.value);


    if (event.target.value != '') {
      //this.values += event.target.value+' ~ ';

      const dato = {
        palabra: this.values,
        tipo: 'user'
      }
      this.servise.searchDataEstudiante(event.target.value).subscribe((res) => {
        console.log(res, 'buscando');
        this.readData = res.data;
      })
    }
    else {

      this.getAllData();
    }
  }
}
