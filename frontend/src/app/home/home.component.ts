import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { CargarScriptsService } from 'src/app/cargar-scripts.service'; 
import { NgwWowService  } from 'ngx-wow';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getparamid:any;

  constructor(private wowService: NgwWowService,private _CargarScripts:CargarScriptsService,private service: ApiserviceService) {
    _CargarScripts.Carga(["slider"]);
    this.wowService.init();
   }

  ngOnInit(): void {

    this._CargarScripts.Carga(["wow"]);
    this.service.getAllDataCurso().subscribe((res) => {
      console.log(res, 'res==>');
      this.getparamid = res.data;
      
    })
  }

}
