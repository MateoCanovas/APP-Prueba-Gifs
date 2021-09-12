import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListaPersonajesComponent } from './componentes/lista-personajes/lista-personajes.component';
import { PaginasGifsComponent } from './componentes/paginas-gifs/paginas-gifs.component';
import { ListadoComponentComponent } from './componentes/listado-component/listado-component.component';
import { HomeComponentComponent } from './componentes/home-component/home-component.component';
import { HeaderComponent } from './componentes/header/header.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaPersonajesComponent,
    PaginasGifsComponent,
    ListadoComponentComponent,
    HomeComponentComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
