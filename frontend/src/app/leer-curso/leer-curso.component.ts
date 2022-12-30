import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leer-curso',
  templateUrl: './leer-curso.component.html',
  styleUrls: ['./leer-curso.component.css']
})
export class LeerCursoComponent implements OnInit {
  estado: any;
  constructor(private servise: ApiserviceService) {



  }

  readData: any;
  succesmsg: any;

  ngOnInit(): void {
    this.getAllData();

  }

  deleteID(id: any) {
    console.log(id, 'deleteid==');
    this.servise.deleteDataCurso(id).subscribe((res) => {
      console.log(res, 'deleted');
      this.succesmsg = res.message;

      this.servise.getAllDataCurso().subscribe((res) => {
        console.log(res, 'res==>');
        this.readData = res.data;
        this.getAllData();
      })
    });
  }
  estadoBaja(id: any, nombre: any) {
    this.estado = "1";
    let formData = new FormData();
    formData.append('estado', 'HOLA');


    Swal.fire({
      title: 'Desea dar el curso: "' + nombre + '"',
      text: "Esta seguro de dar de baja los datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Dar de baja`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.servise.updateEstadoCurso(formData, id).subscribe((res) => {


          // console.log(res, location.reload());
          Swal.fire(
            'Curso dado de baja!',
            'datos actualizados',
            'success'
          )
          console.log(res, 'res==>');
          this.readData = res.data;
          this.getAllData();
        });
      }

    });
  }
  estadoAlta(id: any, nombre: any) {
    this.estado = "1";
    let formData = new FormData();
    formData.append('estado', 'HOLA');


    Swal.fire({
      title: 'Desea dar de alta el curso: "' + nombre + '"',
      text: "Esta seguro de dar de Alta los datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Dar de alta`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.servise.updateEstadoCursoAlta(formData, id).subscribe((res) => {


          // console.log(res, location.reload());
          Swal.fire(
            'Curso dado de alta!',
            'datos actualizados',
            'success'
          )
          console.log(res, 'res==>');
          this.readData = res.data;
          this.getAllData();
        });
      }

    });
  }

  getAllData() {
    this.servise.getAllDataCurso().subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    })
  }
}
