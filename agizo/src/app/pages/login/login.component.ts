import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services';
import { MODEL } from 'src/app/shared';
import { Login } from 'src/app/shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public message: string;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (this.authService.userLogged) {
      this.router.navigate(['/inicial-candidato']);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  private Login(login: MODEL.Login) {
    this.authService.login(login).subscribe(
      (response) => {
        const user = response[0]; //TROCAR PARA QUANDO VIER DO BACKEND, REMOVER ARRAY
        console.log('usuario repsonse', user);
        if (user !== null && user !== undefined) {
          this.authService.userLogged = user;
          this.handleNavigate(user.type);
        } else {
          this.message = 'Usuário/Senha inválidos.';
        }
      },
      (error) => {
        console.log('erro para login', error);
        alert(`Ocorreu um erro ao logar`);
      }
    );
  }

  public onSubmit() {
    const { value, valid } = this.loginForm;

    if (valid) {
      const { email, password } = value;
      const login = new Login(email, password);
      this.Login(login);
    } else {
      alert('Formulário inválido! Preencha todos os campos');
    }
  }

  public handleNavigate(userType: string) {
    let route: string;

    switch (userType) {
      case 'candidato':
        route = '/inicial-candidato';
        break;
      case 'administrador':
        route = '/inicial-administrador';
        break;
      case 'recrutador':
        route = '/inicial-recrutador';
        break;
      default:
        route = '/home';
    }

    this.router.navigate([route]);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
