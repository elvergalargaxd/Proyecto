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


const routes: Routes = [


  {path:'', component:HomeComponent},
  {path:'crearEstudiante', component:CrearEstudianteComponent},
  {path:'crearEstudiante/:id', component:CrearEstudianteComponent},
  {path:'leerEstudiante',component:LeerEstudianteComponent},
  {path:'crearDocente',component:CrearDocenteComponent},
  {path:'leerDocente',component:LeerDocenteComponent},
  {path:'crearDocente/:id',component:CrearDocenteComponent},
  {path:'crearCurso',component:CrearCursoComponent},
  {path:'crearCurso/:id',component:CrearCursoComponent},
  {path:'leerCurso',component:LeerCursoComponent},
  {path:'administrar',component:AdministrarComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
