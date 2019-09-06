import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { ChatPageComponent } from './chat-page/chat-page.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'menu', component: MenuComponent
  },
  {
    path: 'chat', component: ChatComponent
  },  
  {
    path: 'chat-page', component: ChatPageComponent
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
