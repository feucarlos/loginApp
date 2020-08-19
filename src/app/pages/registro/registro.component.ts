import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    this.usuario.email = 'feucarlos@gmail.com';
  }

  onSubmit( form: NgForm ){

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario ( this.usuario )
      .subscribe( resp => {
        console.log( resp );
        Swal.close();
        this.router.navigateByUrl('/home');
      }, (err) => {
        console.log( err.error.error.message );
        Swal.fire({
          allowOutsideClick: true,
          type: 'error',
          text: err.error.error.message
        });
      });

  }

}
