import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    
      this.getparamid =this.router.snapshot.paramMap.get('id');
      if(this.getparamid)
      {

      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
            nombre:res.data[0].nombre,
            descripcion:res.data[0].descripcion
        });
      });

      }
      
  }
  userForm =new FormGroup({
      'nombre':new FormControl('',Validators.required),
      'descripcion':new FormControl('',Validators.required)
  });
  


  userSubmit(){
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createData(this.userForm.value).subscribe((res)=>{
          console.log(res,'res++=+');
          this.userForm.reset();
          this.successmsg=res.message;
        });

      }
      else{
        this.errormsg='todos los datos son requeridos';
      }
  }

  userUpdate()
  {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm  .valid  )
      {
          this.service.updateData(this.userForm.value,this.getparamid).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }


}
