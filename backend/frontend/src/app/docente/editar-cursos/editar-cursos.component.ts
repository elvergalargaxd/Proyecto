import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-editar-cursos',
  templateUrl: './editar-cursos.component.html',
  styleUrls: ['./editar-cursos.component.css']
})
export class EditarCursosComponent implements OnInit {

  constructor(private servise:ApiserviceService) { }

  readData:any;
  data:any;

  ngOnInit(): void {

    const token =localStorage.getItem('token') as string;
    let decodetoken:any = {};
    decodetoken = decode(token);
  
    console.log(decodetoken.id);

    this.data=decodetoken.id;
    this.getAllData();
  }
  getAllData()
  {
    this.servise.cursosDocente(this.data).subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
  obtenerID(id:any){}
}
