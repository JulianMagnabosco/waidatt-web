import { Component, inject, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginService = inject(UserService);

  loginModel = signal({
    username: '',
    password: ''
  });
  loginForm = form(this.loginModel,
    (schemaPath) => {
      required(schemaPath.username, { message: 'Username is required' });
      required(schemaPath.password, { message: 'Password is required' });
      maxLength(schemaPath.username, 20, { message: 'Username cannot exceed 20 characters' });
    },{
      submission: {
        action: async (field) => {
          const result = await this.login(field().value());
          if (result.ok) return;
          return {kind: 'serverError', message: 'Failed to submit form'};
        },
      },
    },)

    login(values: { username: string; password: string }): Promise<{ ok: boolean }> {
      return new Promise((resolve) => {
        this.loginService.login(values).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            resolve({ ok: true });
          },
          error: (error) => {
            console.error('Login failed:', error);
            resolve({ ok: false });
          }
        });
      });
    }

  resetForm() {
    this.loginModel.set({
      username: '',
      password: ''
    });
  }
}
