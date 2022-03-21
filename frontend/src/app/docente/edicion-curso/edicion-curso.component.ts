import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';


@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.css']
})
export class EdicionCursoComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute) { }
  
  errormsg:any;
  successmsg:any; 
  readDataCurso:any;
  getparamid:any;
  idCurso:any;
  readData:any;
  data:any;

  ngOnInit(): void {
    
    this.getparamid =this.router.snapshot.paramMap.get('id');
    
    if(this.getparamid)
    {

    this.service.getSingleDataCurso(this.getparamid).subscribe((res)=>{
      console.log(res,'res==>');
      this.userForm.patchValue({
          nombre:res.data[0].nombre,
          descripcion:res.data[0].descripcion,
          imagen:res.data[0].imagen,
          idDocente:res.data[0].idDocente,
          
          
      });
    });

    }
    this.getAllDataVideo();
    
}
userForm =new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'descripcion':new FormControl('',Validators.required),
    'imagen':new FormControl('',Validators.required),
    'idDocente':new FormControl('',Validators.required),
    
    
});

videoForm =new FormGroup({
  'nombre':new FormControl('',Validators.required),
  'video':new FormControl('',Validators.required),
  'descripcion':new FormControl('',Validators.required),
  'idCurso':new FormControl(this.router.snapshot.paramMap.get('id')),
  
  
});
getAllData()
{
  this.service.getAllDataDocente().subscribe((res)=>{
    this.readDataCurso=res.data;
    
  })
}
getAllDataVideo(){
  this.service.getSingleDataVideo(this.getparamid).subscribe((res)=>{
    console.log(res,'res==>');
    this.readData =res.data;
  })
}
crearVideo(){
  if(this.userForm.valid)
    {
      console.log(this.videoForm.value);
      this.service.createVideo(this.videoForm.value).subscribe((res)=>{
        console.log(res,'res++=+');
        this.videoForm.reset();
        this.successmsg=res.message;
        
      });

    }
    else{
      this.errormsg='todos los datos son requeridos';
    }
}
userSubmit(){
    if(this.userForm.valid)
    {
      console.log(this.userForm.value);
      this.service.createDataCurso(this.userForm.value).subscribe((res)=>{
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
        this.service.updateDataCurso(this.userForm.value,this.getparamid).subscribe((res)=>{
              console.log(res,'modificado');

              this.successmsg=res.message;
        })
    }else{
      this.errormsg='todo es requerido'
    }
}


}

