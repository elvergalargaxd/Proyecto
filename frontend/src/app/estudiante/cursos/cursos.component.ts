import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import  decode  from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  constructor(private servise:ApiserviceService,private router:Router) { }
  //DataEstudianteCurso
  readData:any;
  readDataCursos:any;
  data:any;

  ngOnInit(): void {
    const token =localStorage.getItem('token') as string;
    let decodetoken:any = {};
    decodetoken = decode(token);
  
    console.log(decodetoken.id);

    this.data=decodetoken.id;
    this.cusosInscritos();
  }
  getAllData()
  {
    this.servise.DataEstudianteCurso(this.data).subscribe((res)=>{
      console.log(res,'res==>');
      console.log(this.data);
      this.readData =res.data;
    })
  }
  cusosInscritos(){
    this.servise.getDataCursosEstudiante(this.data).subscribe((res)=>{
      console.log(res);
      this.readDataCursos=res.data;
    })
  }
  ingresarCurso(id:any){
    
    console.log("curso "+id)
    this.router.navigate(['/estudiante/curso',id]);
    //  this.router.navigate(['/estudiante/curso'])
    // this.servise.diparadorCursos.emit({
    //   data:id 
    // })

     //
   } 
  
}
