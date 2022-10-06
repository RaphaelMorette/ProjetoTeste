import { UserEdicaoComponent } from './pages/users/user-edicao/user-edicao.component';
import { UserCadastroComponent } from './pages/users/user-cadastro/user-cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-cadastro', component: UserCadastroComponent },
  { path: 'user-edicao/:id', component: UserEdicaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
