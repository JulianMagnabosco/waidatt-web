import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('webpage-waidatt');
  protected readonly apiUrl = signal(environment.apiUrl);
  protected readonly whatsappNumber = signal(environment.whatsappNumber);
  protected readonly whatsappLink = signal(environment.whatsappLink);

  admin= signal(false);
}
