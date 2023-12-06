import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fade', [
      transition(':increment', [style({ opacity: 0 }), animate('5000ms', style({ opacity: 1 }))]),
      transition(':decrement', [style({ opacity: 0 }), animate('5000ms', style({ opacity: 1 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  imagesToPreload: string[] = [
    '../../../assets/img/banner-home/foto_1.jpg',
    '../../../assets/img/banner-home/foto_2.jpg',
    '../../../assets/img/banner-home/foto_3.jpg',
    '../../../assets/img/banner-home/foto_4.jpg',
    '../../../assets/img/banner-home/foto_5.jpg',
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.preloadImages(this.imagesToPreload);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.slideProximo();
    }, 5000);
  }

  // Variável para rastrear o estado do slide atual
  slideAtual = 1;

  // Função para avançar para o próximo slide
  slideProximo() {
    if (this.slideAtual < 6) {
      // Se houver mais slides, aumente o número aqui
      this.slideAtual++;
    }
    if (this.slideAtual === 6) {
      this.slideAtual = 1;
    }
  }

  private preloadImages(imageUrls: string[]): Promise<void[]> {
    const promises: Promise<void>[] = [];

    imageUrls.forEach((url) => {
      const img = new Image();
      const promise = new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      img.src = url;
      promises.push(promise);
    });

    return Promise.all(promises);
  }
}
