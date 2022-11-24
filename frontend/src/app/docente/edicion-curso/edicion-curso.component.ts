import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.css']
})
export class EdicionCursoComponent implements OnInit {


  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  errormsg: any;
  successmsg: any;
  readDataCurso: any;
  readDataEvaluacion:any;
  getparamid: any;
  getparamidEvaluacion: any;
  paramidEditarEvaluacion: any;
  getparamidclase: any;
  edited = true;
  idCurso: any;
  readData: any;
  readDataClase: any;
  imgUrl = 'assets/noimage.png';
  data: any;
  desact = '1';
  desactClase = '1';
  image = '';
  images: any = [];
  loading: any;
  nombreCurso: any;
  numeroCursos: any;
  nombreClase:any;
  descripcionClase:any;
  idClase:any;

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id');

    if (this.getparamid) {

      this.service.getSingleDataCurso(this.getparamid).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.patchValue({
          nombreCorto: res.data[0].nombreCorto,
          nombreLargo: res.data[0].nombreLargo,
          descripcion: res.data[0].descripcion,
          imagen: res.data[0].imagen,
          idDocente: res.data[0].idDocente,


        });
        this.nombreCurso = res.data[0].nombreCorto;
        //const str=res.data[0].imagen;
        //this.imgUrl=str;
      });

    }
    this.getAllDataVideo();
    this.getAllDataEvaluacion();

    if(this.getparamidEvaluacion==true){

    }

  }

  userForm = new FormGroup({
    'nombreCorto': new FormControl('', Validators.required),
    'nombreLargo': new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'imagen': new FormControl(''),
    'idDocente': new FormControl(''),


  });

  crearCursos() {
    console.log("mas uno prri");

    const formData = new FormData();
    formData.append('nombre', "+");
    formData.append('descripcion', "+");
    formData.append('file', "+");
    //const nomb=formData.get('nombreVideo');
    //console.log(nomb);
    //formData.append("nombre",)
    this.service.createClase(formData, this.getparamid).subscribe((res) => {
      console.log("curso cargado");
    })

  }

  videoForm = new FormGroup({
    'nombreVideo': new FormControl('', Validators.required),
    'descripcionVideo': new FormControl('', Validators.required),
    'idCurso': new FormControl(this.router.snapshot.paramMap.get('id')),


  });
  claseForm = new FormGroup({
    'nombreClase': new FormControl('', Validators.required),
    'descripcionClase': new FormControl('', Validators.required),
    'idClase': new FormControl(''),
    'posicion': new FormControl(''),
    'video':new FormControl('')

  });
  claseForm2 = new FormGroup({
    'nombreClaseM': new FormControl('', Validators.required),
    'descripcionClaseM': new FormControl('', Validators.required),
    'idClaseM': new FormControl(''),
    'posicionM': new FormControl(''),
    'videoM':new FormControl('')

  });
  evaluacionForm = new FormGroup({
    'pregunta1': new FormControl('', Validators.required),
    'id1':new FormControl(''),
    'pregunta2': new FormControl('', Validators.required),
    'id2':new FormControl(''),
    'pregunta3': new FormControl('', Validators.required),
    'id3':new FormControl(''),
    'pregunta4': new FormControl('', Validators.required),
    'pregunta5': new FormControl('', Validators.required),
    'pregunta6': new FormControl('', Validators.required),
    'pregunta7': new FormControl('', Validators.required),
    'pregunta8': new FormControl('', Validators.required),
    'pregunta9': new FormControl('', Validators.required),
    'pregunta10': new FormControl('', Validators.required),

  });

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event: any) => {

      }
      if (this.image !== null) {
        this.desact = '0';
        this.image = file;
        console.log(this.image);

      }
      else {
        this.image = file;
      }
    }

  }
  modificarClase(id:any){
    console.log(this.claseForm2.value);
    this.service.updateDataClase(this.claseForm2.value,id).subscribe(
      (res) => console.log(res, Swal.fire({

        icon: 'success',
        title: 'Clase modificada!!',
        text: 'La clase se modifico correctamente!'
      }).then((result) => {
        if (result) {
          location.reload();
          this.loading = false;
        }
      })
      ),
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no subio nada!!'
      }).then(
      )
    );
  }

  onSubmit() {



    this.loading = true;

    let formData = new FormData();

    formData.append('file', this.image);
    this.desact == "0"
    //this.http.post<any>('http://localhost:3000/user', formData).subscribe();

    this.service.updatePhotoCurso(formData, this.getparamid).subscribe(
      (res) => console.log(res, Swal.fire({

        icon: 'success',
        title: 'Imagen cargada!!',
        text: 'La imagen se subio correctamente!'
      }).then((result) => {
        if (result) {
          location.reload();
          this.loading = false;
        }
      })
      ),
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no subio nada!!'
      }).then(
      )
    );
    this.loading = false;
  }
  modificarClaseBandera(id:any){

    console.log(id+"aaaaaaaaaaaaaaa")
    this.service.getSingleDataClaseEditar(id).subscribe((res)=>{
      this.claseForm2.patchValue({
        nombreClaseM: res.data[0].nombre,
        descripcionClaseM: res.data[0].descripcion,
        videoM: res.data[0].video,
        idClaseM: res.data[0].idClase,
      });

      this.readDataClase=res.data
      console.log(this.readDataClase)
    })
    this.desactClase='0';
    this.getparamidclase=true;

  }
  banderaEditarEvaluacion(){

  }
  cancelarClaseBandera(){
    this.desactClase='1';
    this.getparamidclase=false;

    location.reload();

  }
  agregarEvaluacion(){
    this.service.createEvaluacion(this.evaluacionForm.value,this.getparamid).subscribe((res=>{
      console.log(res, 'res++=+');
    }))
  }
  getAllDataEvaluacion(){
    this.service.getSingleDataEvaluacion(this.getparamid).subscribe((res)=>{
      console.log(res, 'res==>');
      this.readDataEvaluacion=res.data;
      
      if(res.message=="datos no encontrados"){
        this.getparamidEvaluacion=false;
        console.log(this.getparamidEvaluacion);
      }
      else{
        this.getparamidEvaluacion=true;
        console.log(this.getparamidEvaluacion);

        this.evaluacionForm.patchValue({
          pregunta1: res.data[0].pregunta,
          pregunta2: res.data[1].pregunta,
          pregunta3: res.data[2].pregunta,
          pregunta4: res.data[3].pregunta,
          pregunta5: res.data[4].pregunta,
          pregunta6: res.data[5].pregunta,
          pregunta7: res.data[6].pregunta,
          pregunta8: res.data[7].pregunta,
          pregunta9: res.data[8].pregunta,
          pregunta10: res.data[9].pregunta,


        });
      }
    })

  }

  getAllData() {
    this.service.getAllDataDocente().subscribe((res) => {
      this.readDataCurso = res.data;

    })
  }
  getAllDataVideo() {
    this.service.getSingleDataClase(this.getparamid).subscribe((res) => {
      console.log(res, 'res==>');
      this.readData = res.data;
    })
  }

  borrarCurso(id: any) {

  }
 
  editar(id: any) {

    console.log("editar" + id);
    this.service.getSingleDataClaseEditar(id).subscribe((res) => {
      this.videoForm.patchValue({
        nombreVideo: res.data[0].nombre,
        descripcionVideo: res.data[0].descripcion
      });
    }
    
    )

    this.service.getSingleDataCurso(this.getparamid).subscribe((res) => {
      this.userForm.patchValue({
        nombreCorto: res.data[0].nombreCorto,
        nombreLargo: res.data[0].nombreLargo,
        descripcion: res.data[0].descripcion,
        imagen: res.data[0].imagen,
        idDocente: res.data[0].idDocente,


      });
      this.nombreCurso = res.data[0].nombreCorto;
      //const str=res.data[0].imagen;
      //this.imgUrl=str;
    });
  }
  crearClase() {
    
    //const nomb=formData.get('nombreVideo');
    //console.log(nomb);
    console.log();
    if(this.claseForm.valid) 
      {
        console.log(this.claseForm.value);
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
    
         
          this.service.createClase(this.claseForm.value,this.getparamid).subscribe( res => {
            
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
    
  }
  userSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.createDataCurso(this.userForm.value).subscribe((res) => {
        console.log(res, 'res++=+');
        this.userForm.reset();
        this.successmsg = res.message;
      });

    }
    else {
      this.errormsg = 'todos los datos son requeridos';
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
  }


}

