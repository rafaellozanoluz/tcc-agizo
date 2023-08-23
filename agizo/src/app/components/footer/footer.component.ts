import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public test: Date = new Date();
  public link: string = `https://github.com/rafaellozanoluz/tcc-agizo`;

  constructor() {}

  ngOnInit() {}
}
