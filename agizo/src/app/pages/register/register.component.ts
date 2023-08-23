import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { UsuarioService } from 'src/app/auth/services/usuario.service';
import { LoginService } from 'src/app/layouts/auth-layout/services/login.service';
import { User } from 'src/app/shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  profileForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    cpf: new FormControl(''),
    tel: new FormControl(''),
    address: new FormGroup({
      number: new FormControl(''),
      street: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      cep: new FormControl(''),
    }),
  });

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {}

  private autocompleteAddress(data: any) {
    const { logradouro, bairro, localidade, uf } = data;
    this.profileForm.patchValue({
      address: {
        street: logradouro,
        neighborhood: bairro,
        city: localidade,
        state: uf,
      },
    });
  }

  private searchCep(cep: string) {
    axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => this.autocompleteAddress(response.data))
      .catch((error) => console.log(error));
  }

  private validateCep(cep: string) {
    cep.replace(/\D/g, '');
    if (cep === '') return null;

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

  public onSubmit() {
    const {
      username,
      email,
      cpf,
      tel,
      address: { number, street, neighborhood, city, state, cep },
    } = this.profileForm.value;
    let user = new User(
      null,
      username,
      email,
      '123',
      'candidato',
      cpf,
      tel,
      number,
      street,
      neighborhood,
      city,
      state,
      cep
    );
    this.usuarioService.inserir(user).subscribe((usuario) => {
      alert(`Usuário ${usuario.name} criado com sucesso!`);
      this.router.navigate(['/login']);
    });
  }
}
