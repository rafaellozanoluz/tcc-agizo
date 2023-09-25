import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector:'app-visualizar-curriculo',
  templateUrl: './visualizar-curriculo.component.html',
  styleUrls:['./visualizar-curriculo.component.scss']
})

export class VisualizarCurriculoComponent implements OnInit {
  title = 'html-to-pdf-angular-application';

  constructor() { }

  ngOnInit(): void {
  }

  public convertToPDF(){
    var content = document.getElementById("pdfContainer");
    html2canvas(content).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width/canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
          pdf.save("Currículos AGIZO.pdf");
    })
  }
}
