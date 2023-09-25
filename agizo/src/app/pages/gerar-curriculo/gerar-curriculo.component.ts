import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerar-curriculo',
  templateUrl: './gerar-curriculo.component.html',
  styleUrls: ['./gerar-curriculo.component.scss']
})


export class GerarCurriculoComponent implements OnInit {

  private count = 1;

  
  
  constructor() { }

  ngOnInit(): void {
  document.getElementById("slide").style.marginLeft = "0";
  }

  slide2(): void {
    document.getElementById("slide").style.marginLeft = "-25%";
  }

  slide3(): void {
    document.getElementById("slide").style.marginLeft = "-50%";
  }

  slide4(): void {
    document.getElementById("slide").style.marginLeft = "-75%";
  }

  slide5(): void {
    document.getElementById("slide").style.marginLeft = "-100%";
  }

  slide6(): void {
    document.getElementById("slide").style.marginLeft = "-125%";
  }


}