import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, ObservableLike } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { __param } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(
  private _http:HttpClient,
  private jwtHelper: JwtHelperService){ }


      //conectar frotend con backend
      private URL='http://localhost:3000';
      apiUrl='http://localhost:3000/user';
      apiUrlImagen='http://localhost:3000/userImagen';
      apiUrlImagenCurso='http://localhost:3000/userImagenCurso';
      apiUrlEstado='http://localhost:3000/userEstado';
      apiUrlEstadoAlta='http://localhost:3000/userEstadoAlta'
      apiUrlEstudiante='http://localhost:3000/estudiante';
      apiUrlEstudianteBuscar='http://localhost:3000/estudiante/buscar';
      apiUrlEstudianteBuscar2='http://localhost:3000/estudiante/buscar2';
      apiUrlDocente='http://localhost:3000/docente';
      apiUrlCategoria='http://localhost:3000/categoria';
      apiUrlCurso='http://localhost:3000/curso';
      apiUrlInscripcion='http://localhost:3000/inscripcion';
      apiUrlClase='http://localhost:3000/clase';
      apiUrlEvaluacion='http://localhost:3000/evaluacion';
      




      //Servicios Evaluacion
      updateDataEvaluacion(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put(`${this.apiUrlEvaluacion}/${ids}`,data);
      }

      getSingleDataEvaluacion(id:any):Observable<any>{
        let ids =id;
        return this._http.get(`${this.apiUrlEvaluacion}/${ids}`);
      }
      getSingleDataEvaluacionEditar(id:any):Observable<any>{
        let ids =id;
        return this._http.get(`${this.apiUrlEvaluacion}Editar/${ids}`);
      }
      getAllDataEvaluacion():Observable<any>{
        return this._http.get (`${this.apiUrlEvaluacion}`);
      }
      createEvaluacion(data:any,id:any):Observable<any>
      {
        
        console.log(data.value);
        let ids=id;
          return this._http.post(`${this.apiUrlEvaluacion}/${ids}`,data);
      } 

      
      //
      getDataInscripcion(id:any):Observable<any>{
        let ids=id;
        return this._http.get(`${this.apiUrlInscripcion}/${ids}`);
      }
      //Servicios Clase
      updateDataClase(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put(`${this.apiUrlClase}/${ids}`,data);
      }

      getSingleDataClase(id:any):Observable<any>{
        let ids =id;
        return this._http.get(`${this.apiUrlClase}/${ids}`);
      }
      getSingleDataClaseEditar(id:any):Observable<any>{
        let ids =id;
        return this._http.get(`${this.apiUrlClase}Editar/${ids}`);
      }
      getAllDataClase():Observable<any>{
        return this._http.get (`${this.apiUrlClase}`);
      }
      createClase(data:any,id:any):Observable<any>
      {
        
        console.log(data.value);
        let ids=id;
          return this._http.post(`${this.apiUrlClase}/${ids}`,data);
      } 

      //obtener todo los datos
      singin2(user:any){
        return this._http.post(`${this.URL}/user/singin2`,user)
      }
      singin(user:any){
        console.log(user)
        return this._http.post(`${this.URL}/user/singin`,user)
      }
      isAuth():boolean{

        const token = localStorage.getItem('token');

        //this.jwtHelper.isTokenExpired(token) ||
        if( !localStorage.getItem('token')){
          return false;
         }
        
        return true;
      }
     
      getAllData():Observable<any>
      {
          return this._http.get (`${this.apiUrl}`);
      }

      cursosDocente(id:any):Observable<any>
      {
        let ids =id; 
        return this._http.get(`${this.apiUrlCurso}/docente/${ids}`);

      }
      //crear usuario

      createData(data:any):Observable<any>
      {
        console.log(data,'crearpi');
          return this._http.post(`${this.apiUrl}`,data);
      }

      //eliminar usuario

      deleteData(id:any):Observable<any>
      {
        let ids=id;
        return this._http.delete(`${this.apiUrl}/${ids}`);
      }
      //modificar
      updateData(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrl}/${ids}`,data);
      }
      
      updatePhoto(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrlImagen}/${ids}`,data);
      }
      updatePhotoCurso(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrlImagenCurso}/${ids}`,data);
      }
      
      updateEstado(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrlEstado}/${ids}`,data);
      }
      updateEstadoAlta(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrlEstadoAlta}/${ids}`,data);
      }

      getSingleData(id:any):Observable<any>
      {
        let ids =id;
        return this._http.get(`${this.apiUrl}/${ids}`);

      }

// SERVICIOS DE ESTUDIANTES//////////////////////////////////////////////
        DataEstudianteCurso(id:any):Observable <any>
        {
          let ids=id;
          return  this._http.get(`${this.apiUrlEstudiante}/curso/${ids}`);
        }

      searchDataEstudiante(nombre:any ):Observable<any>
      {
        let ids=nombre;
        return this._http.get(`${this.apiUrlEstudianteBuscar}/${ids}`);
      }
      searchDataEstudiante2(nombre:any ):Observable<any>
      {
        let ids=nombre;
        return this._http.get(`${this.apiUrlEstudianteBuscar2}/${ids}`);
        
      }

      getAllDataEstudiante():Observable<any>
      {
          return this._http.get (`${this.apiUrlEstudiante}`);
      }

      //crear usuario

      createDataEstudiante(data:any):Observable<any>
      {
        console.log(data,'crearpi');
          return this._http.post(`${this.apiUrlEstudiante}`,data);
      }

      //eliminar usuario

      deleteDataEstudiante(id:any):Observable<any>
      {
        let ids=id;
        return this._http.delete(`${this.apiUrlEstudiante}/curso/${ids}`);
      }
      //modificar
      updateDataEstudiante(data:any,id:any):Observable <any>
      {
        let ids=id;
        return  this._http.put  (`${this.apiUrlEstudiante}/${ids}`,data);
      }

      getSingleDataEstudiante(id:any):Observable<any>
      {
        let ids =id;
        return this._http.get(`${this.apiUrlEstudiante}/${ids}`);

      }

      
// SERVICIOS DE DOCENTE//////////////////////////////////////////////
getAllDataDocente():Observable<any>
{ 
    return this._http.get (`${this.apiUrlDocente}`);
}

//crear usuario

createDataDocente(data:any):Observable<any>
{
  console.log(data,'crearpi');
    return this._http.post(`${this.apiUrlDocente}`,data);
}

//eliminar usuario

deleteDataDocente(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrlDocente}/${ids}`);
}
//modificar
updateDataDocente(data:any,id:any):Observable <any>
{
  let ids=id;
  return  this._http.put  (`${this.apiUrlDocente}/${ids}`,data);
}

getSingleDataDocente(id:any):Observable<any>
{
  let ids =id;
  return this._http.get(`${this.apiUrlDocente}/${ids}`);

}
// SERVICIOS DE CATEGORIA//////////////////////////////////////////////
getAllDataCategoria():Observable<any>
{ 
    return this._http.get (`${this.apiUrlCategoria}`);
}

//crear usuario

createDataCategoria(data:any):Observable<any>
{
  console.log(data,'crearpi');
    return this._http.post(`${this.apiUrlCategoria}`,data);
}

//eliminar usuario

deleteDataCategoria(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrlCategoria}/${ids}`);
}
//modificar
updateDataCategoria(data:any,id:any):Observable <any>
{
  let ids=id;
  return  this._http.put  (`${this.apiUrlCategoria}/${ids}`,data);
}

getSingleDataCategoria(id:any):Observable<any>
{
  let ids =id;
  return this._http.get(`${this.apiUrlCategoria}/${ids}`);

}
      
// SERVICIOS DE CURSO//////////////////////////////////////////////
getAllDataCurso():Observable<any>
{
    return this._http.get (`${this.apiUrlCurso}`);
}

//crear usuario

createDataCurso(data:any):Observable<any>
{
  console.log(data,'crearpi');
    return this._http.post(`${this.apiUrlCurso}`,data);
}

//eliminar usuario

deleteDataCurso(id:any):Observable<any>
{
  let ids=id;
  return this._http.delete(`${this.apiUrlCurso}/${ids}`);
}
//modificar
updateDataCurso(data:any,id:any):Observable <any>
{ 
  let ids=id;
  return  this._http.put(`${this.apiUrlCurso}/${ids}`,data);
}

getSingleDataCurso(id:any):Observable<any>
{
  let ids =id;
  return this._http.get(`${this.apiUrlCurso}/${ids}`);

}
// SERVICIOS DE CURSO//////////////////////////////////////////////
createInscripcion(data:any):Observable<any>
{
  console.log(data,'crearpi');
  return this._http.post(`${this.apiUrlInscripcion}`,data);
}

}
