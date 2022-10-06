import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  urlUsers: string = 'http://localhost:3000/usuarios';
  constructor(private _http: HttpClient) {}

  buscarUsuarios(): Observable<any> {
    return this._http.get<any>(this.urlUsers);
  }

  buscarUmUsuario(id: number): Observable<any> {
    return this._http.get<any>(this.urlUsers + '/' + id);
  }

  cadastro(data: any): Observable<any> {
    return this._http.post<any>(this.urlUsers, data)
  }

  edicao(data: any): Observable<any> {
    return this._http.put<any>(this.urlUsers + '/' + data.id, data)
  }

  delete(id: number): Observable<any> {
    return this._http.delete<any>(this.urlUsers + '/' + id)
  }
}
