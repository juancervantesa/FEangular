import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../interfaces/user';

import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])

  })
  constructor(
    private _loginservice: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router

  ) { }
  submit() {

    const modelo: User = {

      username: this.form.value.usuario ?? '',
      password: this.form.value.password ?? '',

    };

    //console.log('___', this.form.value);
    if (this.form.valid) {
      this._loginservice.login(modelo).subscribe({
        next: (data) => {
          //console.log(data);
          this._loginservice.setLocalStorage(data.token);

          this.router.navigate(['']);

          //this.mostrarAlerta(data.message, 'Listo');

        },
        error: (e) => {
          //console.log(e.error.message);

          if (e.error.message == undefined)

            this.mostrarAlerta(e.message, 'Error');

          else
            this.mostrarAlerta(e.error.message, 'Error');
          this.form.reset();
        },
      });

      // // routerLink="/layout"


      //console.log('___', resp)


    }
  }
  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }




}
