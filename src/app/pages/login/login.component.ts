import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
  }

  login( form: NgForm ){

    if ( form.invalid ) { return; }

    this.auth.login( this.usuario )
      .subscribe( resp => {
        console.log( resp );
      }, (err) => {
        console.log( err.error.error.message );
      });
  }

}
