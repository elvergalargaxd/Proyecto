import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2'


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
  public curso=[];
  public cursoNombre=[];

  onKey(event:any){
    console.log(event.target.value);
    if(event.target.value !=''){
      this.values += event.target.value+' ~ ';
    this.service.searchDataEstudiante(event.target.value).subscribe((res)=>{
      console.log(res,'buscando');
      this.buscar=res.data;
    })
    }
    else{
      
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
  
  async obtenerID(id:any)
  {
    this.curso.forEach(data => {
      
      this.cursoNombre.push(data['nombre']);
      console.log('aaaaaaa'+this.cursoNombre);
    });
    console.log(this.cursoNombre);
   console.log(this.curso);
    const { value: fruit } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputPlaceholder: 'Select a fruit',
      inputOptions: this.cursoNombre,
      
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          
        })
      }
    })
    
    if (fruit) {
      Swal.fire(`You selected: ${fruit}`)
    }

    
    this.curso.forEach(data => {
      console.log(data['nombre']);
    });
    

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
      this.curso=res.data;
      
    });
    
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
