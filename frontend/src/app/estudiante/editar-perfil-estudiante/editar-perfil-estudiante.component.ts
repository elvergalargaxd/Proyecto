import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';
import decode from 'jwt-decode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil-estudiante',
  templateUrl: './editar-perfil-estudiante.component.html',
  styleUrls: ['./editar-perfil-estudiante.component.css']
})
export class EditarPerfilEstudianteComponent implements OnInit {

  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }
  data: any;
  errormsg: any;
  successmsg: any;
  prev ='';
  image='';
  imgUrl='assets/noimage.png';
  images:any=[];
  
  desact='1';

  ngOnInit(): void {
    const token = localStorage.getItem('token') as string;
    let decodetoken: any = {};
    decodetoken = decode(token);

    console.log(decodetoken.id);

    this.data = decodetoken.id;

    this.service.getSingleData(this.data).subscribe((res) => {
      console.log(res, 'res==>');
      this.userForm.patchValue({
        nombre: res.data[0].nombre,
        apellido: res.data[0].apellido,
        userName: res.data[0].userName,
        roleID: res.data[0].roleId,
        correo: res.data[0].correo,
        telefono: res.data[0].telefono,
        contrasena: res.data[0].pass,
        pais: res.data[0].pais,
        ciudad: res.data[0].ciudad,
        domicilio: res.data[0].domicilio,
      });
      const str =res.data[0].imagenes;
        console.log(str);
        if(str!=0){

        const str = res.data[0].imagenes;
        console.log("siuuuuuuuu"+str);
        this.imgUrl="http://localhost:4200/assets/"+str;
        }else{
          this.imgUrl=this.imgUrl;
          
          console.log("no image");
        }
    });
  }

  userForm = new FormGroup({
    'nombre': new FormControl('', Validators.required),
    'apellido': new FormControl('', Validators.required),
    'userName': new FormControl('', Validators.required),
    'roleID': new FormControl('docente'),
    'correo': new FormControl('', Validators.required),
    'telefono': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'contrasena': new FormControl('', Validators.required),
    'pais': new FormControl('', Validators.required),
    'ciudad': new FormControl('', Validators.required),
    'domicilio': new FormControl('', Validators.required),

  });
  userUpdate() {
    console.log(this.userForm.value, 'updatedform');
    if (this.userForm.valid) {
      this.service.updateData(this.userForm.value, this.data).subscribe((res) => {
        console.log(res, 'modificado');

        this.successmsg = res.message;
      })
    } else {
      this.errormsg = 'todo es requerido'
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
  onSubmit() {
    let formData = new FormData();
    formData.append('file', this.image);

    //this.http.post<any>('http://localhost:3000/user', formData).subscribe();

    this.service.updatePhoto(formData, this.data).subscribe(
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
}
