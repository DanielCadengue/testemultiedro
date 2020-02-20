import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

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
    return this.httpClient.get('http://5e4ece336272aa0014230fae.mockapi.io/api/v1/func', httpOptions)
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
    return this.httpClient.delete('http://5e4ece336272aa0014230fae.mockapi.io/api/v1/func/' + id, httpOptions)
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
    return this.httpClient.put('http://5e4ece336272aa0014230fae.mockapi.io/api/v1/func/' + id, httpOptions)
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

