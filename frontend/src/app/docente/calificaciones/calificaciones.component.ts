import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../../apiservice.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  constructor(private servise: ApiserviceService, private router: ActivatedRoute) { }

  getparamid: any;

  idEstudiante: any;
  idCurso: any;
  pregunta1: any;
  pregunta2: any;
  pregunta3: any;
  pregunta4: any;
  pregunta5: any;
  pregunta6: any;
  pregunta7: any;
  pregunta8: any;
  pregunta9: any;
  pregunta10: any;

  respuesta1: any;
  respuesta2: any;
  respuesta3: any;
  respuesta4: any;
  respuesta5: any;
  respuesta6: any;
  respuesta7: any;
  respuesta8: any;
  respuesta9: any;
  respuesta10: any;

  ngOnInit(): void {

    this.idEstudiante = this.router.snapshot.paramMap.get('id2');
    console.log("id estudiante", this.idEstudiante);
    this.idCurso = this.router.snapshot.paramMap.get('id');
    console.log("id curso", this.idCurso);



    this.servise.vistaEvaluacion(this.idEstudiante, this.idCurso).subscribe((res) => {
      if (res.data != null) {

        /* Read more about isConfirmed, isDenied below */
        this.getparamid = "1";
        console.log(res, 'res==>');

        this.pregunta1 = res.data[0].pregunta;
        this.pregunta2 = res.data[1].pregunta;
        this.pregunta3 = res.data[2].pregunta;
        this.pregunta4 = res.data[3].pregunta;
        this.pregunta5 = res.data[4].pregunta;
        this.pregunta6 = res.data[5].pregunta;
        this.pregunta7 = res.data[6].pregunta;
        this.pregunta8 = res.data[7].pregunta;
        this.pregunta9 = res.data[8].pregunta;
        this.pregunta10 = res.data[9].pregunta;

        this.respuesta1 = res.data[0].respuesta;
        this.respuesta2 = res.data[1].respuesta;
        this.respuesta3 = res.data[2].respuesta;
        this.respuesta4 = res.data[3].respuesta;
        this.respuesta5 = res.data[4].respuesta;
        this.respuesta6 = res.data[5].respuesta;
        this.respuesta7 = res.data[6].respuesta;
        this.respuesta8 = res.data[7].respuesta;
        this.respuesta9 = res.data[8].respuesta;
        this.respuesta10 = res.data[9].respuesta;

        this.evaluacionForm.patchValue({
          respuesta1Id: res.data[0].idRespuesta,
          respuesta2Id: res.data[1].idRespuesta,
          respuesta3Id: res.data[2].idRespuesta,
          respuesta4Id: res.data[3].idRespuesta,
          respuesta5Id: res.data[4].idRespuesta,
          respuesta6Id: res.data[5].idRespuesta,
          respuesta7Id: res.data[6].idRespuesta,
          respuesta8Id: res.data[7].idRespuesta,
          respuesta9Id: res.data[8].idRespuesta,
          respuesta10Id: res.data[9].idRespuesta,

          respuesta1: res.data[0].respuesta,
          respuesta2: res.data[1].respuesta,
          respuesta3: res.data[2].respuesta,
          respuesta4: res.data[3].respuesta,
          respuesta5: res.data[4].respuesta,
          respuesta6: res.data[5].respuesta,
          respuesta7: res.data[6].respuesta,
          respuesta8: res.data[7].respuesta,
          respuesta9: res.data[8].respuesta,
          respuesta10: res.data[9].respuesta,

          calificacion1: res.data[0].calificacion,
          calificacion2: res.data[1].calificacion,
          calificacion3: res.data[2].calificacion,
          calificacion4: res.data[3].calificacion,
          calificacion5: res.data[4].calificacion,
          calificacion6: res.data[5].calificacion,
          calificacion7: res.data[6].calificacion,
          calificacion8: res.data[7].calificacion,
          calificacion9: res.data[8].calificacion,
          calificacion10: res.data[9].calificacion,


        });

      }
      else {


        console.log("no existe evaluacion");

        Swal.fire({
          icon: 'info',
          title: 'no existe evaluacion...',
          text: 'Consulte en informaciones!',
          footer: '<a href="">Ir a informaciones?</a>'
        })


      }
    }

    )

  }

  calificar() {
    if (this.evaluacionForm.get('calificacion1')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...1',
        text: 'Error al calificar la pregunta 1!'
      })
    }
    if (this.evaluacionForm.get('calificacion2')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...2',
        text: 'Error al calificar la pregunta 2!'
      })
    }
    if (this.evaluacionForm.get('calificacion3')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...3',
        text: 'Error al calificar la pregunta 3!'
      })
    }
    if (this.evaluacionForm.get('calificacion4')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 4!'
      })
    }
    if (this.evaluacionForm.get('calificacion5')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 5!'
      })
    }
    if (this.evaluacionForm.get('calificacion6')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 6!'
      })
    }
    if (this.evaluacionForm.get('calificacion7')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 7!'
      })
    }
    if (this.evaluacionForm.get('calificacion8')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 8!'
      })
    }
    if (this.evaluacionForm.get('calificacion9')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 9!'
      })
    }
    if (this.evaluacionForm.get('calificacion10')?.value > 10) {
      Swal.fire({
        icon: 'error',
        title: 'La calificacion maxima es 10...',
        text: 'Error al calificar la pregunta 10!'
      })
    }
    else {

      //this.posicionId=this.claseForm.get('posicion')?.value;
      Swal.fire({
        title: 'Desea subir las calificaciones',
        text: "Esta seguro de los datos! ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',      
       confirmButtonText: `Calificar`,
       }).then((result) => {
       if (result.isConfirmed) {
  
        this.servise.updateDataRespuesta(this.evaluacionForm.value, this.idEstudiante, this.idCurso).subscribe((res) => {
         
        
        Swal.fire(
          'Estudiante Calificado!',
          'datos actualizados',
          'success'
        )
         });
       }
       
     });
    }
  }

  evaluacionForm = new FormGroup({

    'respuesta1': new FormControl('', Validators.required),
    'respuesta2': new FormControl('', Validators.required),
    'respuesta3': new FormControl('', Validators.required),
    'respuesta4': new FormControl('', Validators.required),
    'respuesta5': new FormControl('', Validators.required),
    'respuesta6': new FormControl('', Validators.required),
    'respuesta7': new FormControl('', Validators.required),
    'respuesta8': new FormControl('', Validators.required),
    'respuesta9': new FormControl('', Validators.required),
    'respuesta10': new FormControl('', Validators.required),

    'respuesta1Id': new FormControl('', Validators.required),
    'respuesta2Id': new FormControl('', Validators.required),
    'respuesta3Id': new FormControl('', Validators.required),
    'respuesta4Id': new FormControl('', Validators.required),
    'respuesta5Id': new FormControl('', Validators.required),
    'respuesta6Id': new FormControl('', Validators.required),
    'respuesta7Id': new FormControl('', Validators.required),
    'respuesta8Id': new FormControl('', Validators.required),
    'respuesta9Id': new FormControl('', Validators.required),
    'respuesta10Id': new FormControl('', Validators.required),

    'calificacion1': new FormControl('', Validators.required),
    'calificacion2': new FormControl('', Validators.required),
    'calificacion3': new FormControl('', Validators.required),
    'calificacion4': new FormControl('', Validators.required),
    'calificacion5': new FormControl('', Validators.required),
    'calificacion6': new FormControl('', Validators.required),
    'calificacion7': new FormControl('', Validators.required),
    'calificacion8': new FormControl('', Validators.required),
    'calificacion9': new FormControl('', Validators.required),
    'calificacion10': new FormControl('', Validators.required),

  });

}
