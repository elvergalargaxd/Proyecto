import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-leer-docente',
  templateUrl: './leer-docente.component.html',
  styleUrls: ['./leer-docente.component.css']
})
export class LeerDocenteComponent implements OnInit {

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
    this.servise.deleteData(id).subscribe((res)=>{
      console.log(res,'deleted');
        this.succesmsg=res.message;
        
        this.servise.getAllDataDocente().subscribe((res)=>{
          console.log(res,'res==>');
          this.readData =res.data;
          this.getAllData();
        })
      });
  }

  getAllData()
  {
    this.servise.getAllDataDocente().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}


