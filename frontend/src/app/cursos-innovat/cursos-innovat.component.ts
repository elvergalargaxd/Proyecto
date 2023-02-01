import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cursos-innovat',
  templateUrl: './cursos-innovat.component.html',
  styleUrls: ['./cursos-innovat.component.css']
})
export class CursosInnovatComponent implements OnInit {

  getparamid:any;
  readDataCategoria: any;
  constructor(private service: ApiserviceService, private router:Router) { }

  ngOnInit(): void {
    this.service.getAllDataCurso().subscribe((res) => {
      console.log(res, 'res==>');
      this.getparamid = res.data;
      
    })
    this.getAllDataCategoria();
  }

  getAllDataCategoria() {
    this.service.getAllDataCategoria().subscribe((res) => {
      this.readDataCategoria = res.data;
      console.log(res.data);
    })
  }

  seleccionarCategoras(id:any){

    console.log(id);

    this.service.getSingleDataCursoCategoria(id).subscribe((res) => {
      this.getparamid = res.data;
      console.log(res.data);
    })
  }
  seleccionarCurso(id:any){
    console.log(id);
    this.router.navigate(['cursoInnovat/'+id]);
  }

}
