import { AuthenticationService } from './../../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edicao',
  templateUrl: './user-edicao.component.html',
  styleUrls: ['./user-edicao.component.css'],
})
export class UserEdicaoComponent implements OnInit {
  cepNaoEncontrado: boolean = false;
  classToApply: string = 'noShow';

  formUsuarios = new FormGroup({
    id: new FormControl('', [Validators.required]),
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
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this._authService.auth() === true) {
      this._router.navigate(['/login']);
    }

    this.buscarUsuario(Number(this._route.snapshot.paramMap.get('id')));

  }

  buscarUsuario(id: number) {
    this._userService.buscarUmUsuario(id).subscribe((data) => {
      this.formUsuarios.controls.id.setValue(data['id']);
      this.formUsuarios.controls.nome.setValue(data['nome']);
      this.formUsuarios.controls.telefone.setValue(data['telefone']);
      this.formUsuarios.controls.email.setValue(data['email']);
      this.formUsuarios.controls.senha.setValue(data['senha']);
      this.formUsuarios.controls.acesso.setValue(data['acesso']);
      this.formUsuarios.controls.cep.setValue(data['cep']);
      this.formUsuarios.controls.logradouro.setValue(data['logradouro']);
      this.formUsuarios.controls.bairro.setValue(data['bairro']);
      this.formUsuarios.controls.cidade.setValue(data['cidade']);
      this.formUsuarios.controls.estado.setValue(data['estado']);
    });
  }

  editar() {
  //  console.log('formUsuario', this.formUsuarios.value)
  //  console.log('id', this.formUsuarios.controls.id)
    this._userService.edicao(this.formUsuarios.value).subscribe((data) => {
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
