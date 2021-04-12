import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PublicComponent } from './public/public.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthInterceptor } from './auth-interceptor';
import { SearcherComponent } from './searcher/searcher.component';
import { ShortenPipe } from './shorten.pipe';
import { EditComponent } from './edit/edit.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchItemComponent } from './search-item/search-item.component';
import { SafePipe } from './safe.pipe';
import { NoteItemComponent } from './note-item/note-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PublicComponent,
    SpinnerComponent,
    SearcherComponent,
    ShortenPipe,
    EditComponent,
    NotFoundComponent,
    SearchItemComponent,
    SafePipe,
    NoteItemComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
