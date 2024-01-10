// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    const { username, password } = this.loginForm.value;
    this.authService.signIn(username, password)
      .then((result) => {
        console.log('Autenticación exitosa', result);
        this.authService.enviarEvento(username);
        this.authService.enviarEventoLogin(false);
      })
      .catch((error) => {
        console.error('Error de autenticación', error);
        console.log('Error de auth: ', error);
        // Realiza las acciones necesarias después de un error de autenticación
        this.authService.enviarEventoLogin(false);
      });
  }
}
