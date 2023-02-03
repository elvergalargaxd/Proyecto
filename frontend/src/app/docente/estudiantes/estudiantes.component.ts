import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import decode from 'jwt-decode';
import { ImpresionService } from 'src/app/impresion.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {


  constructor(private servise: ApiserviceService, private router: ActivatedRoute,private srvImpresion: ImpresionService,) {


  }

  readData: any;
  succesmsg: any;
  redData: any;
  data: any;
  getparamid: any;
  nombreCurso: any;

  ngOnInit(): void {
    
    this.getparamid = this.router.snapshot.paramMap.get('id');

    console.log("numero de curso"+this.getparamid);

    const token = localStorage.getItem('token') as string;
    let decodetoken: any = {};
    decodetoken = decode(token);

    console.log(decodetoken.id);

    this.data = decodetoken.id;
    this.getAllData();

  }

  obtenerID(id: any,idCurso: any) {
    console.log(id, 'deleteid==',idCurso);
  }

  getAllData() {
    console.log("numero de curso"+this.data);
    this.servise.vistaInscripciones(this.getparamid).subscribe((res) => { 
      console.log(res, 'res==>');
      this.nombreCurso = res.data[0].nombreCorto;
      this.readData = res.data;
    })
  }
  imprimir(){
    
    this.servise.vistaInscripciones(this.getparamid).subscribe(res => {
      console.log(res.data, 'res==>');

      const encabezado = [
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Apellidos', dataKey: 'apellido' },
        { header: 'Nota', dataKey: 'nota' },
        { header: 'Curso', dataKey: 'nombreCorto' },
        { header: 'Estado del curso', dataKey: 'estadoCurso' },
       
      ];
      const cuerpo = res.data
      this.nombreCurso = res.data[0].nombreCorto;

      this.readData = res;
      this.srvImpresion.imprimir(encabezado, cuerpo, this.nombreCurso+" lista de estudiantes" , true);
    })
  }
}

