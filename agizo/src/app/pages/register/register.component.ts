import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services';
import { MODEL } from 'src/app/shared';
import { Client } from 'src/app/shared/models';

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
      const client = this.dataFormBuilder(value);
      this.createClient(client);
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
}
