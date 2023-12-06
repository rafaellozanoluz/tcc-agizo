import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services';
import { MODEL } from 'src/app/shared';
import { Client } from 'src/app/shared/models';
import { cpf } from 'cpf-cnpj-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public clientForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cellphone: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit() {}

  private dataFormBuilder(value): MODEL.Client {
    const { name, cpf, email, password, cellphone, type } = value;
    const client = new Client(null, name, cpf, email, password, cellphone, type);

    return client;
  }

  private createClient(client: MODEL.Client) {
    this.clientService.create(client).subscribe(
      (client) => {
        alert(`${client.name}, conta criada com sucesso!`);
        this.clientForm.reset();
        this.handleNavigate('/login');
      },
      (error) => {
        alert(`${client.name}, algo deu errado na criação da conta. Email enviado`);
      }
    );
  }

  public onSubmit() {
    const { value, valid } = this.clientForm;

    if (valid) {
      if (this.termosAceitos) {
        const client = this.dataFormBuilder(value);
        this.createClient(client);
      } else {
        this.mensagemVisivel = true;
      }
    } else {
      alert('Formulário inválido! Preencha todos os campos');
    }
  }

  public handleNavigate(route: string) {
    this.router.navigate([route]);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateCPF(control) {
    const enteredCPF = control.value;
    if (enteredCPF && !cpf.isValid(enteredCPF)) {
      return { invalidCPF: true };
    }
    return null;
  }

  onCPFInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) {
      value = value.slice(0, 11); // Limita o tamanho máximo do CPF
    }

    // Aplica a máscara
    value = this.formatCPF(value);

    const cpfControl = this.clientForm.get('cpf');
    cpfControl?.setValue(value); // Atualiza o valor do campo no formulário
    if (cpfControl?.value && !cpf.isValid(cpfControl.value)) {
      cpfControl.setErrors({ invalidCPF: true });
    } else {
      cpfControl?.setErrors(null);
    }
  }

  formatCPF(cpf: string): string {
    // Aplicar a máscara para exibição do CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(): void {
    const campoTelefone = this.clientForm.get('cellphone');
    const cellphone = campoTelefone?.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const regexTelefone = /^(\d{2})(\d{4,5})(\d{4})$/;

    if (regexTelefone.test(cellphone)) {
      const telefoneFormatado = cellphone.replace(regexTelefone, '($1) $2-$3');
      campoTelefone?.setValue(telefoneFormatado);
      campoTelefone?.setErrors(null); // Limpa os erros após a formatação
    } else {
      campoTelefone?.setErrors({ invalidPhone: true }); // Define como inválido se não estiver no formato esperado
    }
  }

  mostrarModal = false;
  termosAceitos = false;
  mensagemVisivel = true;

  abrirModal(): void {
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  esconderMensagem(): void {
    this.mensagemVisivel = false;
    this.termosAceitos = true;
  }
}
