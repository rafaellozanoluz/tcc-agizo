import { Component, OnInit } from '@angular/core';
import { CabecalhoService } from 'src/app/services/cabecalho.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicial-candidato',
  templateUrl: './inicial-candidato.component.html',
  styleUrls: ['./inicial-candidato.component.scss'],
})
export class InicialCandidatoComponent implements OnInit {
  hasCabecalho = true;

  constructor(private cabecalhoService: CabecalhoService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.userId;
    const userIdString: string = userId.toString();
    this.verificarCabecalho(userIdString);
  }

  verificarCabecalho(userId: string): void {
    this.cabecalhoService.obterCabecalhoPorUsuario(userId).subscribe(
      (cabecalho) => {
        if (cabecalho) {
          this.hasCabecalho = true;
        } else {
          this.hasCabecalho = false;
        }
      },
      (error) => {
        console.error('Erro ao verificar o cabeçalho:', error);
      }
    );
  }
}
