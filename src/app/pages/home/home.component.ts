import { UsersService } from './../../services/users.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    if (!this._authService.auth() === true) {
      this._router.navigate(['/login']);
    }

    this.listar();
  }

  listaUsuarios: any[] = [];

  listar() {
    this._userService.buscarUsuarios().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }

  criarUsuario() {
    this._router.navigate(['/user-cadastro']);
  }

  goAlterar(id: number) {
    this._router.navigate(['/user-edicao', id]);
  }

  deletar(id: number) {
    this._userService.delete(id).subscribe((data) => {
      this.listar();
    });
  }
}
