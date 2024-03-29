import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import { LeerEstudianteComponent } from './leer-estudiante/leer-estudiante.component';
import { HomeComponent } from './home/home.component';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { LeerDocenteComponent } from './leer-docente/leer-docente.component';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { LeerCursoComponent } from './leer-curso/leer-curso.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { AsignarEstudianteCursoComponent } from './asignar-estudiante-curso/asignar-estudiante-curso.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DocenteComponent } from './docente/docente/docente.component';
import { EditarPerfilComponent } from './docente/editar-perfil/editar-perfil.component';
import { EditarCursosComponent } from './docente/editar-cursos/editar-cursos.component';
import { EdicionCursoComponent } from './docente/edicion-curso/edicion-curso.component';
import { RegisterComponent } from './register/register.component';
import { EstudiantesComponent } from './docente/estudiantes/estudiantes.component';
import { EstudianteComponent } from './estudiante/estudiante/estudiante.component';
import { EditarPerfilEstudianteComponent } from './estudiante/editar-perfil-estudiante/editar-perfil-estudiante.component';
import { CursosComponent } from './estudiante/cursos/cursos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ReporteComponent } from './reporte/reporte.component';
import { CursoComponent } from './estudiante/curso/curso.component';
import { EvaluacionComponent } from './estudiante/evaluacion/evaluacion.component';
import { CalificacionesComponent } from './docente/calificaciones/calificaciones.component';
import { CursosInnovatComponent } from './cursos-innovat/cursos-innovat.component';
import { CursoInovateComponent } from './curso-inovate/curso-inovate.component';
import { LeerInscripcioneComponent } from './leer-inscripcione/leer-inscripcione.component';


const routes: Routes = [

  
  {path:'reporte',component:ReporteComponent},
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'cursosInnovat', component:CursosInnovatComponent},
  {path:'cursoInnovat/:id', component:CursoInovateComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'docente', component:DocenteComponent,canActivate:[RoleGuard], data: { expectedRole: 'docente' },
    children:[
      {path:'perfil', component:EditarPerfilComponent},
      {path:'cursos', component:EditarCursosComponent},
      {path:'edicionCurso/:id', component:EdicionCursoComponent},
      {path:'estudiante/:id', component:EstudiantesComponent},
      {path:'calificaciones', component:CalificacionesComponent},
      {path:'calificaciones/:id/:id2', component:CalificacionesComponent},
      {path:'estudiante', component:EstudiantesComponent}
    ] 
  }, 
  {path:'estudiante', component:EstudianteComponent,canActivate:[RoleGuard], data: { expectedRole: 'user' },
  children:[
    {path:'cursos', component:CursosComponent},
    {path:'perfilEstudiante', component:EditarPerfilEstudianteComponent},
    {path:'curso', component:CursoComponent},
    {path:'curso/:id', component:CursoComponent},
    {path:'evaluacion', component:EvaluacionComponent},
    {path:'evaluacion/:id', component:EvaluacionComponent},
  ] 
}, 

  {path:'administrar',component:AdministrarComponent,canActivate:[RoleGuard], data: { expectedRole: 'admin' },
    children:[
     
      {path:'leerEstudiante',component:LeerEstudianteComponent},
      {path:'crearEstudiante',component:CrearEstudianteComponent},
      {path:'crearEstudiante/:id', component:CrearEstudianteComponent},
      {path:'leerEstudiante',component:LeerEstudianteComponent},
      {path:'crearDocente',component:CrearDocenteComponent},
      {path:'leerDocente',component:LeerDocenteComponent},
      {path:'crearDocente/:id',component:CrearDocenteComponent},
      {path:'crearCurso',component:CrearCursoComponent},
      {path:'crearCurso/:id',component:CrearCursoComponent},
      {path:'leerCurso',component:LeerCursoComponent},
      {path:'asignarEstudianteCurso',component:AsignarEstudianteCursoComponent },
      {path:'asignarEstudianteCurso/:id',component:AsignarEstudianteCursoComponent},
      {path:'asignarEstudianteCurso',component:AsignarEstudianteCursoComponent},
      {path:'categorias',component:CategoriasComponent},
      {path:'reporte',component:ReporteComponent},
      {path:'leerInscripciones',component:LeerInscripcioneComponent },
    ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[RoleGuard,AuthGuard]
})
export class AppRoutingModule { }
