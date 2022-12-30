import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getparamid:any;

  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {

    this.service.getAllDataCurso().subscribe((res) => {
      console.log(res, 'res==>');
      this.getparamid = res.data;
      
    })
  }

}
