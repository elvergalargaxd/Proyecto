import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-leer',
  templateUrl: './leer.component.html',
  styleUrls: ['./leer.component.css']
})
export class LeerComponent implements OnInit {

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
        
        this.servise.getAllData().subscribe((res)=>{
          console.log(res,'res==>');
          this.readData =res.data;
          this.getAllData();
        })
      });
  }

  getAllData()
  {
    this.servise.getAllData().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}
