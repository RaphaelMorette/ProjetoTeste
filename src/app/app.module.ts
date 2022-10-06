import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent } from './pages/shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { UserCadastroComponent } from './pages/users/user-cadastro/user-cadastro.component';
import { UserEdicaoComponent } from './pages/users/user-edicao/user-edicao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UserCadastroComponent,
    UserEdicaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
