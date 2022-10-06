import { HttpClient } from '@angular/common/http';
import { UsersService } from './../../../services/users.service';
import { AuthenticationService } from './../../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-cadastro',
  templateUrl: './user-cadastro.component.html',
  styleUrls: ['./user-cadastro.component.css'],
})
export class UserCadastroComponent implements OnInit {
  cepNaoEncontrado: boolean = false;
  classToApply: string = 'noShow';

  formUsuarios = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
    ]),
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    acesso: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    logradouro: new FormControl('', [Validators.required]),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this._authService.auth() === true) {
      this._router.navigate(['/login']);
    }
  }

  cadastrar() {
    // console.log('formUsuario', this.formUsuarios.value)
    this._userService.cadastro(this.formUsuarios.value).subscribe((data) => {
      this._router.navigate(['/home']);
    });
  }

  buscarCep(event: any) {
    // console.log('cep', event.target.value);
    const cep = event.target.value;
    this._http
      .get('https://viacep.com.br/ws/' + cep + '/json/')
      .subscribe((dataCep: any) => {
        // console.log("dataCep =>", dataCep)
        if (dataCep.erro) {
          this.classToApply = 'noShow';
          this.cepNaoEncontrado = true;
          setTimeout(() => {
            this.cepNaoEncontrado = false;
            this.formUsuarios.controls.cep.setValue('');
          }, 3000);
          return;
        }
        this.classToApply = 'show';
        this.formUsuarios.controls.logradouro.setValue(dataCep['logradouro']);
        this.formUsuarios.controls.bairro.setValue(dataCep['bairro']);
        this.formUsuarios.controls.cidade.setValue(dataCep['localidade']);
        this.formUsuarios.controls.estado.setValue(dataCep['uf']);

      });
  }
}
