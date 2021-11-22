import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-leer-curso',
  templateUrl: './leer-curso.component.html',
  styleUrls: ['./leer-curso.component.css']
})
export class LeerCursoComponent implements OnInit {

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
    this.servise.getAllDataCurso().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}
