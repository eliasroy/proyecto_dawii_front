import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamo } from '../models/reclamo.model';
import { AppSettings } from '../app.settings';
import { DatePipe } from '@angular/common';

const baseUrlUtil = AppSettings.API_ENDPOINT + '/util';
const baseUrlReclamo = AppSettings.API_ENDPOINT + '/reclamo';
const baseUrlCrudReclamo = AppSettings.API_ENDPOINT + '/CrudReclamo';

@Injectable({
  providedIn: 'root',
})
export class ReclamoService {
  insertaRegistra(reclamo: Reclamo) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  insertaReclamo(data: Reclamo): Observable<any> {
    return this.http.post(baseUrlReclamo, data);
  }

  listaReclamo(
    descripcion: string,
    fechaCompra: Date,
    idCliente: number,
    idTipoReclamo: number,
    estado: number
  ): Observable<any> {
    var fechaCompraString = fechaCompra.toString();

    if (fechaCompraString.includes('GMT') || fechaCompraString.length == 0) {
      fechaCompraString = '1900/01/01';
    } else {
      fechaCompraString = fechaCompraString.replace('-', '/').replace('-', '/');
    }

    console.log(fechaCompraString);
    const params = new HttpParams()
      .set('descripcion', descripcion)
      .set('idCliente', idCliente)
      .set('idTipoReclamo', idTipoReclamo)
      .set('estado', estado)
      .set('fechaCompra', fechaCompraString);
    return this.http.get<any>(baseUrlReclamo + '/listaReclamoConParametros', {
      params,
    });
  }

  //............crud

  listReclamo(filtro: string): Observable<Reclamo[]> {
    return this.http.get<Reclamo[]>(
      baseUrlCrudReclamo + '/listaPorDescripcionLike/' + filtro
    );
  }

  updateReclamo(obj: Reclamo): Observable<any> {
    return this.http.put(`${baseUrlCrudReclamo}/actualizaReclamo`, obj);
  }

  deleteReclamo(id: any): Observable<any> {
    return this.http.delete(`${baseUrlCrudReclamo}/eliminaReclamo/${id}`);
  }

  registraReclamo(Reclamo: Reclamo): Observable<any> {
    return this.http.post<any>(`${baseUrlCrudReclamo}/registraReclamo`, Reclamo);
  }
}
