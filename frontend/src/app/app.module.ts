import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import  {HttpClientModule} from '@angular/common/http';
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
    AdministrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
