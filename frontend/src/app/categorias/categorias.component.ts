import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import Swal from 'sweetalert2'
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  buscar:any;
  getparamid:any;

  ngOnInit(): void {

    this.service.getAllDataCategoria().subscribe((res)=>{
      this.buscar=res.data;
    })
    this.getparamid=3;
  } 

  useForm =new FormGroup({
    'id':new FormControl('',),
    'nombre':new FormControl('',Validators.required),
    'descripcion':new FormControl('',Validators.required),
    
  });

  submit(){

    console.log('aaaaaaaaa');
    if(this.useForm.valid){
      Swal.fire({
        title: 'Desea crear categoria',
        text: "Esta seguro de los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Guardar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.service.createDataCategoria(this.useForm.value).subscribe((res)=>{
        console.log(this.useForm);
          
        // console.log(res, location.reload());
        Swal.fire(
          'Categoria creada!',
          'datos actualizados',
          'success'
        )
       this.getAllData();
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
      
    }
  }
  deleteCategoria(id:any){
      Swal.fire({
        title: 'Desea eliminar categoria',
        text: "Esta seguro!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Cambiar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.service.deleteDataCategoria(id).subscribe((res)=>{
        console.log(this.useForm);
          
        // console.log(res, location.reload());
        Swal.fire(
          'Categoria eliminada!',
          'datos actualizados',
          'success'
        )
       this.getAllData();
         });
       }
       
     });
  }
  cancel(){
    window.location.reload();
  }
  upload(){

    console.log('aaaaaaaaa');
    if(this.useForm.valid){
      Swal.fire({
        title: 'Desea modificar categoria',
        text: "Esta seguro de los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Cambiar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.service.updateDataCategoria(this.useForm.value,this.useForm.value.id).subscribe((res)=>{
        console.log(this.useForm);
          
        // console.log(res, location.reload());
        Swal.fire(
          'Categoria modificada!',
          'datos actualizados',
          'success'
        )
       this.getAllData();
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
      
    }
  }
  
  getAllData(){
    this.service.getAllDataCategoria().subscribe((res)=>
    {
      this.buscar=res.data;
    })

  }
  obtenerID(id:any){
    this.getparamid=0;
    this.service.getSingleDataCategoria(id).subscribe((res)=>{
      this.useForm.patchValue({
        id:res.data[0].idCategoria,
        nombre:res.data[0].nombre,
        descripcion:res.data[0].descripcion
      })
    })
  }
}
