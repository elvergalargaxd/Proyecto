import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import decode from 'jwt-decode';
import { ApiserviceService } from '../../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  constructor(private service: ApiserviceService, private routerDireccion: Router, private router: ActivatedRoute) {

  }

  timeLeft: number = 60;
  timeLeftHora: number = 60;
  interval: any;
  intervalHora: any;
  subscribeTimer: any;
  subscribeTimerHora: any;

  getparamidEvaluacion: any;
  getparamid: any;
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

  pregunta1Id: any;
  pregunta2Id: any;
  pregunta3Id: any;
  pregunta4Id: any;
  pregunta5Id: any;
  pregunta6Id: any;
  pregunta7Id: any;
  pregunta8Id: any;
  pregunta9Id: any;
  pregunta10Id: any;

  banderaRespuestas: any;


  idEstudiante: any;

  ngOnInit(): void {

    const token = localStorage.getItem('token') as string;
    let decodetoken: any = {};
    decodetoken = decode(token);

    console.log(decodetoken.id);

    this.idEstudiante = decodetoken.id;

    this.getparamid = this.router.snapshot.paramMap.get('id');


    this.rellenarFormulario();

    this.datosRespuestasEstudiante();


  }

  rellenarFormulario() {
    
    Swal.fire({
      title: 'Realizar la evaluacion?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Comenzar',
      denyButtonText: `Cancelar`,
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')

      }
      else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
         
      }
     })

    this.service.getSingleDataEvaluacion(this.getparamid).subscribe((res) => {
      if (res.data != null) {
       
          /* Read more about isConfirmed, isDenied below */
         
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

            this.evaluacionForm.patchValue({
              respuesta1Id: res.data[0].idEvaluacion,
              respuesta2Id: res.data[1].idEvaluacion,
              respuesta3Id: res.data[2].idEvaluacion,
              respuesta4Id: res.data[3].idEvaluacion,
              respuesta5Id: res.data[4].idEvaluacion,
              respuesta6Id: res.data[5].idEvaluacion,
              respuesta7Id: res.data[6].idEvaluacion,
              respuesta8Id: res.data[7].idEvaluacion,
              respuesta9Id: res.data[8].idEvaluacion,
              respuesta10Id: res.data[9].idEvaluacion,


            });
            this.startTimer();

           
       

        this.getparamidEvaluacion = true;
        console.log(this.getparamidEvaluacion);


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

  datosRespuestasEstudiante() {
    this.service.getDataRespuestaEstudiante(this.idEstudiante, this.getparamid).subscribe((res) => {

      if (this.banderaRespuestas != null) {
        console.log(" hay preguntas ");
      }

      else {

        Swal.fire({
          icon: 'info',
          title: 'Evaluacion ya fue realizada...',
          text: 'Usted ya respondio a la evaluacion!',
          footer: '<a href="">Ir a informaciones?</a>'
        })

        console.log(res, 'res==>');
        this.evaluacionForm.patchValue({
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


        });
        this.evaluacionForm.get('respuesta1')?.disable();
        this.evaluacionForm.get('respuesta2')?.disable();
        this.evaluacionForm.get('respuesta3')?.disable();
        this.evaluacionForm.get('respuesta4')?.disable();
        this.evaluacionForm.get('respuesta5')?.disable();
        this.evaluacionForm.get('respuesta6')?.disable();
        this.evaluacionForm.get('respuesta7')?.disable();
        this.evaluacionForm.get('respuesta8')?.disable();
        this.evaluacionForm.get('respuesta9')?.disable();
        this.evaluacionForm.get('respuesta10')?.disable();
      }


    })
  }
  enviarEvaluacion() {
    this.service.createRespuesta(this.evaluacionForm.value, this.idEstudiante).subscribe((res) => {
      console.log(res, "datos ingresados");

    })
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000,1000)

    this.intervalHora = setInterval(() => {
      if (this.timeLeftHora > 0) {
        this.timeLeftHora--;
      } else {
        this.timeLeftHora = 60;
      }
    }, 60000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  observableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });

    const sou=timer(1000,60000);
    const abcd = sou.subscribe(val => {
      console.log(val, '-');
      
      this.subscribeTimerHora=this.timeLeftHora-val;
    });
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

  });
}
