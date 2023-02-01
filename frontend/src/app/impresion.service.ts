import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor() { }
  imprimir(encabezado:Array<any>,cuerpo:Array<any>,titulo:string,guardar?:boolean){
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format:'letter'
    });
    doc.text(titulo,doc.internal.pageSize.width/2,25,{align:'center'});

    autoTable(doc, {
      theme:'grid',
      body: cuerpo,
      columns: encabezado,
    })
    if(guardar){
      const hoy=new Date();
      doc.save(hoy.getTime()+'.pdf');
    }
    else{

    }

  }
}
