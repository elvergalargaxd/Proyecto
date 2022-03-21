import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private servise:ApiserviceService) { }
  //DataEstudianteCurso
  readData:any;
  data:any;

  ngOnInit(): void {
    const token =localStorage.getItem('token') as string;
    let decodetoken:any = {};
    decodetoken = decode(token);
  
    console.log(decodetoken.id);

    this.data=decodetoken.id;
  }
  getAllData()
  {
    this.servise.DataEstudianteCurso(this.data).subscribe((res)=>{
      console.log(res,'res==>');
      console.log(this.data);
      this.readData =res.data;
    })
  }
}
