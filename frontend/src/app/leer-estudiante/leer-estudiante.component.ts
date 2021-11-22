import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-leer-estudiante',
  templateUrl: './leer-estudiante.component.html',
  styleUrls: ['./leer-estudiante.component.css']
})
export class LeerEstudianteComponent implements OnInit {

  constructor(private servise:ApiserviceService) { 

  

  }

  readData:any;
  succesmsg:any;

  ngOnInit(): void {
    this.getAllData();
    
  }

  deleteID(id:any)
  {
    console.log(id,'deleteid==');
    this.servise.deleteDataEstudiante(id).subscribe((res)=>{
      console.log(res,'deleted');
        this.succesmsg=res.message;
        
        this.servise.getAllDataEstudiante().subscribe((res)=>{
          console.log(res,'res==>');
          this.readData =res.data;
          this.getAllData();
        })
      });
  }

  getAllData()
  {
    this.servise.getAllDataEstudiante().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}

