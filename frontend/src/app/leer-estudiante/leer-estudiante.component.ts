import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-leer-estudiante',
  templateUrl: './leer-estudiante.component.html',
  styleUrls: ['./leer-estudiante.component.css']
})
export class LeerEstudianteComponent implements OnInit {

  constructor(private servise:ApiserviceService,private router:Router) { 

   
 
  }
  values='';
  readData:any;
  succesmsg:any;
  estado:any;
  buscar:any;

  ngOnInit(): void {
    this.getAllData();
    
  }

  onKey(event:any){
    console.log(event.target.value);
    if(event.target.value !=''){
      this.values += event.target.value+' ~ ';
    this.servise.searchDataEstudiante(event.target.value).subscribe((res)=>{
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
  getAllData()
  {
    this.servise.getAllData().subscribe((res)=>{
      console.log(res,'res==>');
      this.readData =res.data;
    })
  }
}

