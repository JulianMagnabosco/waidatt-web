import { Component } from '@angular/core';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-home',
  imports: [Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  slides = [
    { id: 1, imageUrl: 'Captura3.png', title: '' },
    { id: 2, imageUrl: 'Captura2.png', title: '' },
    { id: 3, imageUrl: 'Captura1.png', title: '' },
  ];
}
