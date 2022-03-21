import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-asignar-estudiante-curso',
  templateUrl: './asignar-estudiante-curso.component.html',
  styleUrls: ['./asignar-estudiante-curso.component.css']
})
export class AsignarEstudianteCursoComponent implements OnInit {

  constructor(private service:ApiserviceService, private  router:ActivatedRoute) { }


  values='';
  errormsg:any;
  successmsg:any; 
  getparamid:any;
  readDataEstudiante:any;
  readDataCurso:any;
  buscar:any;
  idEstudiante:any;
 

  onKey(event:any){
    
    if(this.values='')
    {
      this.service.searchDataEstudiante("").subscribe((res)=>{
        console.log(res,'buscando');
        this.buscar=res.data;
      })
    }
    else{
    this.values += event.target.value+' ~ ';
    this.service.searchDataEstudiante(event.target.value).subscribe((res)=>{
      console.log(res,'buscando');
      this.buscar=res.data;
    })
  }
  }

  ngOnInit(): void {
    
      
    this.getAllData();
    this.search.valueChanges.subscribe(value=> this.searchEmiter.emit(value));
    
  }

  @Output('search') searchEmiter=new EventEmitter<string>();

  asignarEC(){
    
        console.log(this.useForm.value);
        this.service.createInscripcion(this.useForm.value).subscribe((res)=>{
          console.log(res,'res++=+');
          this.useForm.reset();
          this.successmsg=res.message;
        });

    
  }

  today = Date.now();
    fixedTimezone = this.today;
  
  obtenerID(id:any)
  {
    console.log(id,'deleteid==');
    this.service.getSingleData(id).subscribe((res)=>{
      console.log(res,'deleted');
        this.readDataEstudiante=(res.data);
        this.useForm.patchValue({
          id:res.data[0].id,
          nombre:res.data[0].nombre,
          apellido:res.data[0].apellido,
          correo:res.data[0].correo,
          telefono:res.data[0].telefono,
          
        })
      });
      
  } 
 
  

  search=new FormControl('')

  getAllData()
  {
    this.service.getAllDataEstudiante().subscribe((res)=>{
      console.log(res,'res==>');
      this.readDataEstudiante =res.data;
    });
    this.service.getAllDataCurso().subscribe((res)=>{
      console.log(res,'res==>');
      this.readDataCurso =res.data;
    })
  }

  userForm =new FormGroup({
      'nombre':new FormControl('',Validators.required),
      'apPaterno':new FormControl('',Validators.required),
      'apMaterno':new FormControl('',Validators.required),
      'correo':new FormControl('',Validators.required),
      'contrasena':new FormControl('',Validators.required),
      
  });
  useForm =new FormGroup({
    'id':new FormControl('',Validators.required),
    'nombre':new FormControl('',Validators.required),
    'apellido':new FormControl('',Validators.required),
    'telefono':new FormControl('',Validators.required),
    'correo':new FormControl('',Validators.required),
    'idCurso':new FormControl('',Validators.required),
    'costo':new FormControl('',Validators.required),
    'fecha':new FormControl('')

    
});
  
  userSubmit(){
      if(this.userForm.valid)
      {
        console.log(this.userForm.value);
        this.service.createDataEstudiante(this.userForm.value).subscribe((res)=>{
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
          this.service.updateDataEstudiante(this.userForm.value,this.getparamid).subscribe((res)=>{
                console.log(res,'modificado');

                this.successmsg=res.message;
          })
      }else{
        this.errormsg='todo es requerido'
      }
  }


}
