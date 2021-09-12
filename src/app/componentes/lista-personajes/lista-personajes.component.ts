import { Component, Input } from '@angular/core';
import { PersonajeDB } from 'src/app/interfaces/Personaje-db';
import { DragonBallServiceService } from 'src/app/services/dragon-ball-service.service';

@Component({
  selector: 'app-lista-personajes',
  templateUrl: './lista-personajes.component.html',
  styleUrls: ['./lista-personajes.component.css']
})
export class ListaPersonajesComponent {

  @Input() personajes: PersonajeDB[] = [];
  personajeActual = this.dbService.getPersonajeActual;

  get resultados() {
    return this.dbService.getGifsPersonajes;
  }

  constructor(private dbService: DragonBallServiceService) { }

  mostrarGifs(name: string) {

    name = name.toLowerCase();
    let ultimaBusqueda = this.dbService.getGifsPersonajes;
    
    if (ultimaBusqueda.length === 0 || (ultimaBusqueda.length > 0 
      && ultimaBusqueda[0].name !== name)) {
        this.dbService.buscarPorPersonaje(name);

        // console.log(name);
        
    }
    
  }

}
