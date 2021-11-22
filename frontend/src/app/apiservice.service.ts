import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }


      //conectar frotend con backend

      apiUrl='http://localhost:3000/user';
      apiUrlEstudiante='http://localhost:3000/estudiante';
      apiUrlDocente='http://localhost:3000/docente';
      apiUrlCurso='http://localhost:3000/curso';

      //obtener todo los datos

      getAllData():Observable<any>
      {
          return this._http.get (`${this.apiUrl}`);
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

      getSingleData(id:any):Observable<any>
      {
        let ids =id;
        return this._http.get(`${this.apiUrl}/${ids}`);

      }

// SERVICIOS DE ESTUDIANTES//////////////////////////////////////////////
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
        return this._http.delete(`${this.apiUrlEstudiante}/${ids}`);
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
  return  this._http.put  (`${this.apiUrlCurso}/${ids}`,data);
}

getSingleDataCurso(id:any):Observable<any>
{
  let ids =id;
  return this._http.get(`${this.apiUrlCurso}/${ids}`);

}


}
