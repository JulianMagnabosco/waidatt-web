import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { UserService } from './services/user-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webpage-waidatt');
  
  protected readonly whatsappNumber = signal(environment.whatsappNumber);
  protected readonly whatsappLink = signal(environment.whatsappLink);

  userService = inject(UserService);

  userLoggedIn = this.userService.isLoggedIn;

  logout() {
    this.userService.logout();
  }
  

}
