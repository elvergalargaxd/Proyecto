import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-curso',
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {

  pipe = new DatePipe('en-US');

  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

 

  errormsg: any;
  successmsg: any;
  prev ='';
  imgUrl = 'assets/noimage.png';
  getparamid: any;
  readDataDocente: any;
  readDataCategoria: any;
  fecha: any;
  todayWithPipe: any;
  image='';
  desact = '1';
  edited=true;
  ngOnInit(): void {
    this.fecha = new Date().getDay();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

    console.log(this.fecha);
    console.log(this.todayWithPipe);
    this.userForm.patchValue({
      fecha:this.todayWithPipe
    })
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {

      this.service.getSingleDataCurso(this.getparamid).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.patchValue({
          nombreLargo: res.data[0].nombreLargo,
          nombreCorto: res.data[0].nombreCorto,
          descripcion: res.data[0].descripcion,
          categoria: res.data[0].categoria,
          precio: res.data[0].precio,
          fecha: this.todayWithPipe,

          idDocente: res.data[0].idDocente

        });
        const str = res.data[0].imagen;
        const newStr = str.slice(19);
        console.log(newStr) ;
        this.imgUrl=str;
        
        this.prev=newStr;
        console.log(this.imgUrl);

      });

    }
    this.getAllData();
    this.getAllDataCategoria();

  }
  
  userForm = new FormGroup({
    'nombreLargo': new FormControl('', Validators.required),
    'nombreCorto': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    
    'categoria': new FormControl(''),
    'precio': new FormControl('', Validators.required),
    'idDocente': new FormControl('', Validators.required),
    'fecha': new FormControl(''),
    

  });
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

  onSubmit() {
    
    let formData = new FormData();

    const userName=formData.get('nombreLargo');
    console.log(userName+'gaaaaaaaaaa');
    formData.append('file', this.image);
    

    //this.http.post<any>('http://localhost:3000/user', formData).subscribe();

    this.service.updatePhotoCurso(formData, this.getparamid).subscribe(
      (res) => console.log(res, Swal.fire({
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
  getAllData() {
    this.service.getAllDataDocente().subscribe((res) => {
      this.readDataDocente = res.data;
      console.log(res.data);
    })

  }
  getAllDataCategoria() {
    this.service.getAllDataCategoria().subscribe((res) => {
      this.readDataCategoria = res.data;
      console.log(res.data);
    })
  }

  userSubmit() {
    
    if(this.userForm.valid){
      Swal.fire({
        title: 'Desea crar el curso',
        text: "Esta seguro de los datos! "+this.userForm.value.nombreLargo,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Crear`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.service.createDataCurso(this.userForm.value).subscribe((res)=>{
        
          
        // console.log(res, location.reload());
        Swal.fire(
          'Curso creado!',
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
      this.errormsg='todos los datos son requeridos';
    }
  }

  userUpdate() {
    console.log(this.userForm.value, 'updatedform');
    if (this.userForm.valid) {
      this.service.updateDataCurso(this.userForm.value, this.getparamid).subscribe((res) => {
        console.log(res, 'modificado');

        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'todo es requerido'
    }

    if(this.userForm.valid){
      Swal.fire({
        title: 'Desea modificar el curso',
        text: "Esta seguro de los datos! "+this.userForm.value.nombreLargo,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Modificar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.service.updateDataCurso(this.userForm.value,this.getparamid).subscribe((res)=>{
        
          
        // console.log(res, location.reload());
        Swal.fire(
          'Curso modificado!',
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
      this.errormsg='todos los datos son requeridos';
    }
  }


}

