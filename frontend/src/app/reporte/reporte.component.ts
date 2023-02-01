import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../cargar-scripts.service';
import {Chart, registerables} from 'node_modules/chart.js';
import { ApiserviceService } from '../apiservice.service';
Chart.register(...registerables);

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  readData:any;

  nombre:any[]=[];
  cantidad:any[]=[];
  categoria:any[]=[];

  constructor(private _CargarScripts:CargarScriptsService,private servise: ApiserviceService) {
   }
 
  ngOnInit(): void {
    this.getAllData();
    
  }

  RenferChart(nombre:any,cantidad:any){
    const ctx = document.getElementById('myChart');


  new Chart("piechart", {
    type: 'doughnut',
    data: {
      labels: nombre,
      datasets: [{
        label: '# de inscritos',
        data: cantidad,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        
      }
    }
  });
  }
  other(nombre:any,cantidad:any){
    const ctx = document.getElementById('myChart');

  new Chart("colum", {
    type: 'bar',
    data: {
      labels: nombre,
      datasets: [{
        label: '# de inscritos',
        data: cantidad,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    
    options: {
      indexAxis: 'x',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Estudiantes aprobados'
        }
      }
    },
  });
  }

  getAllData() {
    this.servise.inscripcionReporte().subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
      if(this.readData!=null){
      for(let i=0;i<this.readData.length;i++){
        this.nombre.push(this.readData[i].nombreCorto);
        this.cantidad.push(this.readData[i].cantidad);
      }
      this.RenferChart(this.nombre,this.cantidad);
      this.other(this.nombre,this.cantidad);
    }
    });
    
  }
}
