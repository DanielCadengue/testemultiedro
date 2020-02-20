import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Departamento } from '../models/departamento';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public buscar() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    }
    return this.httpClient.get('http://5e4dfea16272aa001423030f.mockapi.io/v1/dep/depart', httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }




  public deletar(id: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    }
    return this.httpClient.delete('http://5e4dfea16272aa001423030f.mockapi.io/v1/dep/depart/' + id, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));

  }

  public editar(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      })
    }
    return this.httpClient.put('http://5e4dfea16272aa001423030f.mockapi.io/v1/dep/depart/' + id, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }






  //tratamento de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
