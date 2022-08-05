import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import  {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeerEstudianteComponent } from './leer-estudiante/leer-estudiante.component';
import { CrearEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import { HomeComponent } from './home/home.component';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { LeerDocenteComponent } from './leer-docente/leer-docente.component';
import { LeerCursoComponent } from './leer-curso/leer-curso.component';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { AdministrarComponent } from './administrar/administrar.component';
import { AsignarEstudianteCursoComponent } from './asignar-estudiante-curso/asignar-estudiante-curso.component';
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EditarPerfilComponent } from './docente/editar-perfil/editar-perfil.component';
import { EditarCursosComponent } from './docente/editar-cursos/editar-cursos.component';
import { DocenteComponent } from './docente/docente/docente.component';
import { EdicionCursoComponent } from './docente/edicion-curso/edicion-curso.component';
import { RegisterComponent } from './register/register.component';
import { EstudiantesComponent } from './docente/estudiantes/estudiantes.component';
import { EstudianteComponent } from './estudiante/estudiante/estudiante.component';
import { CursosComponent } from './estudiante/cursos/cursos.component';
import { EditarPerfilEstudianteComponent } from './estudiante/editar-perfil-estudiante/editar-perfil-estudiante.component';




@NgModule({
  declarations: [
    AppComponent,
    LeerEstudianteComponent,
    CrearEstudianteComponent,
    LeerDocenteComponent,
    CrearDocenteComponent,
    LeerCursoComponent,
    CrearCursoComponent,
    HomeComponent,
    CrearDocenteComponent,
    LeerDocenteComponent,
    LeerCursoComponent,
    CrearCursoComponent,
    AdministrarComponent,
    AsignarEstudianteCursoComponent,
    LoginComponent,
    EditarPerfilComponent,
    EditarCursosComponent,
    DocenteComponent,
    EdicionCursoComponent,
    RegisterComponent,
    EstudiantesComponent,
    EstudianteComponent,
    CursosComponent,
    EditarPerfilEstudianteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    ApiserviceService,
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
