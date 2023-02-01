import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-curso-inovate',
  templateUrl: './curso-inovate.component.html',
  styleUrls: ['./curso-inovate.component.css']
})
export class CursoInovateComponent implements OnInit {

  getparamid: any;
  getparamidCurso: any;
  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    console.log(this.getparamid);
    this.getAllData();
  }
  
  getAllData() {
    this.service.getSingleDataCurso(this.getparamid).subscribe((res) => {
      this.getparamidCurso = res.data;
      
      console.log(res.data);
      console.log(res.data[0].nombreCorto);
      console.log(this.getparamidCurso[0].nombreCorto)
    })

  }

}
