import { Component } from '@angular/core';
import { DragonBallServiceService } from 'src/app/services/dragon-ball-service.service';

@Component({
  selector: 'app-listado-component',
  templateUrl: './listado-component.component.html',
  styleUrls: ['./listado-component.component.css']
})
export class ListadoComponentComponent {

  title = 'DragonBall';

  get personajes() {
    return this.dbService.getPersonajes;
  }

  termino: string = 'Buscar personaje';

  constructor(private dbService: DragonBallServiceService) {}

  buscar(termino: string) {
    
    termino = termino.toLowerCase();

    if (!this.dbService.getinsertados.includes(termino)) {
      
      this.dbService.buscarPersonaje(termino);
      
    }
  }

}
