import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyByAENfScd8YM_vrOb3qGe0NYcc2CuSRgY';

  userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient ) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {
        // console.log('Entro en el mapa del RXJS');
        this.guardarToken ( resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`, authData
    ).pipe(
      map( resp => {
        // console.log('Entro en el mapa del RXJS');
        this.guardarToken ( resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setTime( hoy.getTime() + 3600 * 1000 );
    localStorage.setItem('expira', hoy.getTime().toString() );
  }

  leerToken(){
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }

  estaAuntenticado(){
    if ( this.userToken.length < 2 ){
      return false;
    }

    const expira = Number( localStorage.getItem('expira') );
    const ahora = new Date().getTime();

    if ( expira > ahora ){
      return true;
    } else {
      return false;
    }

  }

}
