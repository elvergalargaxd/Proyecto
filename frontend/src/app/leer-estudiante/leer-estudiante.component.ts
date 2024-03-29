import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiserviceService } from '../apiservice.service'; 
import Swal from 'sweetalert2';
import { ImpresionService } from '../impresion.service';


@Component({
  selector: 'app-leer-estudiante',
  templateUrl: './leer-estudiante.component.html',
  styleUrls: ['./leer-estudiante.component.css']
})
export class LeerEstudianteComponent implements OnInit {

  constructor(private servise:ApiserviceService,private router:Router,private srvImpresion: ImpresionService) { 

   
 
  }
  values='';
  readData:any;
  succesmsg:any;
  estado:any;
  buscar:any;
  tipoUsuario='user';
  datos={
    tipo:'',
    palabra:''
  }

  ngOnInit(): void {
    this.getAllData();
    
  }

  onKey(event:any){
    console.log(event.target.value);
    

    if(event.target.value !=''){
      //this.values += event.target.value+' ~ ';

      const dato={
        palabra:this.values,
        tipo:'user'
      }
    this.servise.searchDataEstudiante(event.target.value).subscribe((res)=>{
      console.log(res,'buscando');
      this.readData=res.data;
    })
    }
    else{
      this.getAllData();
    }
  }
  onKey2(event:any){
    console.log(event.target.value);
    

    if(event.target.value !=''){
      //this.values += event.target.value+' ~ ';

      this.datos={
        tipo:'user',
        palabra:event.target.value
        
      }
      console.log('jjjjjjjjj'+this.datos)
    this.servise.searchDataEstudiante2(this.datos).subscribe((res:any)=>{
      console.log(res,'buscando');
      this.readData=res.data;
    })
    }
    else{
      
    }
  }

  deleteID(id:any,nombre:any)
  {
    //console.log(id,'deleteid==');
    //this.servise.deleteData(id).subscribe((res)=>{
      //console.log(res,'deleted');
       // this.succesmsg=res.message;
        
       // this.servise.getAllData().subscribe((res)=>{
        //  console.log(res,'res==>');
        //  this.readData =res.data;
        //  this.getAllData();
        //})
     // });

        Swal.fire({
          title: 'Desea eliminar los datos de "'+nombre+'"',
          text: "Esta seguro de eliminar los datos!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',      
         confirmButtonText: `Eliminar`,
         }).then((result) => {
         if (result.isConfirmed) {
    
         
          this.servise.deleteData(id).subscribe( (res) => {
            
          // console.log(res, location.reload());
          Swal.fire(
            'Datos Eliminados!',
            'Los datos fueron Eliminados.',
            'success'
          )
          console.log(res,'res==>');
          this.readData =res.data;
         this.getAllData();
           });
         }
         
       });  
  }
  modificar(id:any,nombre:any){
    
    Swal.fire({
      title: 'Desea modificar a "'+nombre+'"',
      text: "Esta seguro de modificar los datos!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
     confirmButtonText: `Modificar`,
     }).then((result) => {
     if (result.isConfirmed) {
      this.router.navigate(['/administrar/crearEstudiante',id]);
     }
     
   });  
  }
  downData(id:any, nombre:any){
    
    this.estado="1";
    let formData = new FormData();
    formData.append('estado','HOLA');
    
    
    Swal.fire({
      title: 'Desea dar de baja a "'+nombre+'"',
      text: "Esta seguro de dar de baja los datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
     confirmButtonText: `Dar de baja`,
     }).then((result) => {
     if (result.isConfirmed) {

      this.servise.updateEstado(formData,id).subscribe((res)=>{
      
        
      // console.log(res, location.reload());
      Swal.fire(
        'Estudiante de baja!',
        'datos actualizados',
        'success'
      )
      console.log(res,'res==>');
      this.readData =res.data;
     this.getAllData();
       });
     }
     
   });  
  }
  upData(id:any, nombre:any){
    
    this.estado="1";
    let formData = new FormData();
    formData.append('estado','HOLA');
    
    
    Swal.fire({
      title: 'Desea dar de activar "'+nombre+'"',
      text: "Esta seguro de dar de Alta los datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',      
     confirmButtonText: `Dar de alta`,
     }).then((result) => {
     if (result.isConfirmed) {

      this.servise.updateEstadoAlta(formData,id).subscribe((res)=>{
      
        
      // console.log(res, location.reload());
      Swal.fire(
        'Estudiante de baja!',
        'datos actualizados',
        'success'
      )
      console.log(res,'res==>');
      this.readData =res.data;
     this.getAllData();
       });
     }
     
   });  
  }
  getAllData()
  {
    this.servise.getAllData().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
  imprimir(){
    
    this.servise.getAllData().subscribe(res => {
      console.log(res.data, 'res==>');

      const encabezado = [
        { header: 'Nombre', dataKey: 'nombre' },
        { header: 'Apellidos', dataKey: 'apellido' },
        { header: 'Correo', dataKey: 'correo' },
        { header: 'Telefono', dataKey: 'telefono' },
        { header: 'Domicilio', dataKey: 'domicilio' },
        { header: 'Ciudad', dataKey: 'ciudad' },
        { header: 'Estado', dataKey: 'estado' },
      ];
      const cuerpo = res.data

      this.readData = res;
      this.srvImpresion.imprimir(encabezado, cuerpo, "Lista de estudiantes", true);
    })
  }
}

