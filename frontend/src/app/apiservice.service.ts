import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }


      //conectar frotend con backend

      apiUrl='http://localhost:3000/user'

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

}
