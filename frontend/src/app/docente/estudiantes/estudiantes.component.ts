import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  
  constructor(private servise:ApiserviceService) { 

  

  }
  
  readData:any;
  succesmsg:any;
  redData:any;
  data:any;

  ngOnInit(): void {
    const token =localStorage.getItem('token') as string;
        let decodetoken:any = {};
        decodetoken = decode(token);
      
        console.log(decodetoken.id);

        this.data=decodetoken.id;
    this.getAllData();
    
  }

  deleteID(id:any)
  {
    console.log(id,'deleteid==');
    this.servise.deleteDataCurso(id).subscribe((res)=>{
      console.log(res,'deleted');
        this.succesmsg=res.message;
        
        this.servise.getAllDataCurso().subscribe((res)=>{
          console.log(res,'res==>');
          this.readData =res.data;
          this.getAllData();
        })
      });
  }

  getAllData()
  {
    this.servise.getDataInscripcion(this.data).subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}