import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {
    path: '', component: ChatPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
  },  
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'menu', component: MenuComponent, canActivate: [AuthGuard]
  },
  {
    path: 'chat', component: ChatComponent, canActivate: [AuthGuard]
  },  
  {
    path: 'chat-page', component: ChatPageComponent, canActivate: [AuthGuard]
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
