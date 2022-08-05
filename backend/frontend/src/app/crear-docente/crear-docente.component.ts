import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {

  public archivos:any=[];

  public previsualizacion :string | undefined;
  public loading: boolean | undefined;
  


  constructor(private service:ApiserviceService, private  router:ActivatedRoute,private sanitizer: DomSanitizer) { }

  prev ='';
  title='uploadFiles';
  image='';
  imgUrl='assets/noimage.png';
  images:any=[];
  nombre='pepeeeeeeee';
  edited=true;

  errormsg:any;
  successmsg:any;
  getparamid:any;
  readDataCurso:any;
  desact='1';

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
        const str = res.data[0].imagenes;
        const newStr = str.slice(19);
        console.log(newStr) ;
        this.imgUrl="http://localhost:4200/assets/"+newStr;
        
        this.prev=newStr;
        console.log(this.imgUrl);
      });

      }
       
  }
  selectImage(event: any){
    if(event.target.files.length>0){
      const file=event.target.files[0];
      const reader=new FileReader();
      

      reader.readAsDataURL(file);
      reader.onload=(event:any)=>{
        this.imgUrl=event.target.result;
      }
      if(this.image!==null){
        this.desact='0';
      this.image=file;
      this.prev=this.image;
      console.log(this.image);
      }
      else{
        this.image=file;
      }
    }
    
  }
  onSubmit(){
    let formData = new FormData();
    formData.append('file',this.image);
    
    //this.http.post<any>('http://localhost:3000/user', formData).subscribe();
    
    this.service.updatePhoto(formData,this.getparamid).subscribe(
      (res) => console.log(res,  Swal.fire({
                icon: 'success',
                title: 'Imagen cargada!!',
                text: 'La imagen se subio correctamente!'
                }).then((result) => {
                            if (result) {
                                      location.reload();
                          } 
               }) 
         ),
      (err) => Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Parece que no subio nada!!' 
                    })
    );
  }
  userForm =new FormGroup({
    'nombre':new FormControl('',Validators.required),
    'apellido':new FormControl('',Validators.required),
    'userName':new FormControl('',Validators.required),
    'roleID':new FormControl('docente'),
    'correo':new FormControl('',Validators.required),
    'telefono':new FormControl('',[Validators.required,Validators.minLength(6)]),
    'contrasena':new FormControl('',Validators.required)
      
  });
  
  
  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }
  
  userSubmit(){

    if(this.userForm.valid) 
    {
      console.log(this.userForm.value);
      Swal.fire({
        title: 'Desea guardar los datos?',
        text: "Esta seguro de los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Ingresar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
       
        this.service.createData(this.userForm.value).subscribe( res => {
          
        // console.log(res, location.reload());
        Swal.fire(
          'Datos Ingresados!',
          'Los datos fueron ingresados.',
          'success'
        )
         });
       }
     });   

    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los datos son requeridos!'
      })
      this.errormsg='todos los datos son requeridos';
    }
///////////////////////////////////////////
      
  }
  getAllData(){
    this.service.getAllDataCurso().subscribe((res)=>{
      console.log(res,'res==>');
      this.readDataCurso=res.data;
    })
  }

  userUpdate()
  {
    Swal.fire({
      title: 'Desea modificar los datos?',
      text: "Esta seguro de los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
     confirmButtonText: `Modificar`,
     }).then((result) => {
     if (result.isConfirmed) {

     
      this.service.updateData(this.userForm.value,this.getparamid).subscribe( res => {
        
      // console.log(res, location.reload());
      Swal.fire(
        'Datos Modificados!',
        'Los datos fueron ingresados.',
        'success'
      )
       });
     }
   });   
  }
  


}
