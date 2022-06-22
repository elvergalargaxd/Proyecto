import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {

  public archivos:any=[];

  public previsualizacion :string | undefined;
  public loading: boolean | undefined;
  public prev:string | undefined;


  constructor(private service:ApiserviceService, private  router:ActivatedRoute,private sanitizer: DomSanitizer) { }


  public archi:any=[];
  errormsg:any;
  successmsg:any;
  getparamid:any;
  readDataCurso:any;

  ngOnInit(): void {

      
    
      this.getparamid =this.router.snapshot.paramMap.get('id');
      if(this.getparamid)
      {

      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          nombre:res.data[0].nombre,
          apellido:res.data[0].apellido,
          userName:res.data[0].userName,
          roleID:res.data[0].roleId,
          correo:res.data[0].correo,
          telefono:res.data[0].telefono,
          contrasena:res.data[0].pass,
          imagenes:res.data[0].imagenes
          
        });
        this.prev=res.data[0].imagenes;
      });

      }
       
  }
  userForm =new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'apellido':new FormControl('',Validators.required),
    'userName':new FormControl('',Validators.required),
    'roleID':new FormControl('docente'),
    'correo':new FormControl('',Validators.required),
    'telefono':new FormControl('',[Validators.required,Validators.minLength(6)]),
    'contrasena':new FormControl('',Validators.required),
    'imagenes':new FormControl('',Validators.required)
      
  });
  
  capturarFile(event: any){
    const archivoCapturado=event.target.files[0];
    const archi=event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion=imagen.base;
      console.log(imagen);
      this.archi=imagen.base;
    })

    this.archivos.push(archivoCapturado);

    console.log(event.target.files);
  }
  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }
  save(): void {
    const formData = new FormData();
    formData.append('myImageToSend', this.archivos.file);
    
    this.service.createData(formData).subscribe(data => {});
}
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return reader.result;
    } catch (e) {
      return null;
    }
  })
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
  getAllData(){
    this.service.getAllDataCurso().subscribe((res)=>{
      console.log(res,'res==>');
      this.readDataCurso=res.data;
    })
  }

  userUpdate()
  {
      console.log(this.userForm.value,'updatedform');
      if(this.userForm.valid  )
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
