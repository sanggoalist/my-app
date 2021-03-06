import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { LoginComponent } from './login/login.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { SpinnerOverlayComponent } from '../app/spinner/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { ChatComponent } from './chat/chat.component';
import { DatabaseService } from './database.service';
import {MatIconModule} from '@angular/material/icon';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { ListChatComponent } from './list-chat/list-chat.component';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { SearchFriendComponent } from './search-friend/search-friend.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './redux/reducers';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './local-storage.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RequestFriendComponent } from './request-friend/request-friend.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomePageComponent } from './home-page/home-page.component';
import { FriendsComponent } from './friends/friends.component';
import { ChatsComponent } from './chats/chats.component';
export const firebaseConfig = {
  apiKey: 'AIzaSyAYNkiwIZW2ZFPLfCk1WG4n_yeXoJ9CDLA',
  authDomain: 'my-chat-app-e320d.firebaseapp.com',
  databaseURL: 'https://my-chat-app-e320d.firebaseio.com',
  projectId: 'my-chat-app-e320d',
  storageBucket: 'my-chat-app-e320d.appspot.com',
  messagingSenderId: '443252937045'
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    BasicInfoComponent,
    SpinnerOverlayComponent,
    SpinnerComponent,
    ChatComponent,
    ChatPageComponent,
    ListFriendComponent,
    ListChatComponent,
    ErrorModalComponent,
    RegisterComponent,
    SearchFriendComponent,
    RequestFriendComponent,
    SnackBarComponent,
    HomePageComponent,
    FriendsComponent,
    ChatsComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment["firebase"]),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatAutocompleteModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    StoreModule.forRoot(reducers),
    StorageServiceModule,
    MatSnackBarModule
  ],
  providers: [UserService, DatabaseService, CookieService, LocalStorageService],
  bootstrap: [AppComponent],
  entryComponents: [SpinnerOverlayComponent, ErrorModalComponent]
})
export class AppModule { }
