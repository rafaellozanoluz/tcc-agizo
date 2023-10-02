import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService, ClientService } from 'src/app/services';
import { MODEL } from 'src/app/shared';
import { Address, Client } from 'src/app/shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public clientForm: FormGroup;

  constructor(
    private cepService: CepService,
    private clientService: ClientService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      cellphone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  ngOnInit() {}

  private autocompleteAddress(cep: MODEL.Cep) {
    const { localidade, complemento, logradouro, bairro, uf } = cep;
    this.clientForm.patchValue({
      uf,
      localidade,
      complemento,
      logradouro,
      bairro,
    });
  }

  private searchCep(cep: string) {
    this.cepService.getCep(cep).subscribe((cep) => {
      this.autocompleteAddress(cep);
    });
  }

  private validateCep(cep: string) {
    if (cep.replace(/\D/g, '') === '') return null;

    let validCepRegex = /^[0-9]{8}$/;
    if (!validCepRegex.test(cep)) return null;

    return cep;
  }

  public onBlur(event: any) {
    let cep = event.target.value;
    let isValid = this.validateCep(cep);

    if (isValid) {
      this.searchCep(cep);
    } else {
      alert('Formato de CEP inválido.');
    }
  }

  private dataFormBuilder(value): MODEL.Client {
    const { name, cellphone, email, cep, cpf, uf, localidade, bairro, logradouro, complemento } =
      value;
    const address = new Address(cep, logradouro, complemento, bairro, localidade, uf);
    const client = new Client(null, name, cpf, email, null, cellphone, 'candidato', address);

    return client;
  }

  private createClient(client: MODEL.Client) {
    this.clientService.create(client).subscribe(
      (client) => {
        alert(`${client.name}, conta criada com sucesso! Pendente de aprovação do gerente`);
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
      const client = this.dataFormBuilder(value);
      this.createClient(client);
    } else {
      alert('Formulário inválido! Preencha todos os campos');
    }
  }

  public handleNavigate(route: string) {
    this.router.navigate([route]);
  }
}
