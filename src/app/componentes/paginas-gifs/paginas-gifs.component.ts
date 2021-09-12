import { Component } from '@angular/core';
import { DragonBallServiceService } from 'src/app/services/dragon-ball-service.service';

@Component({
  selector: 'app-paginas-gifs',
  templateUrl: './paginas-gifs.component.html',
  styleUrls: ['./paginas-gifs.component.css']
})
export class PaginasGifsComponent {

  personajeActual = this.dbService.getPersonajeActual;

  get resultados() {
    return this.dbService.getGifsPersonajes;
  }

  constructor(private dbService: DragonBallServiceService) { }

  changePage(direccion: number) {

    if (direccion > 0) {
      if (this.dbService.getGifsPersonajes.length === this.dbService.limite ) {

        this.dbService.buscarPagina(direccion);

        window.scrollTo(0, 0);
      }
    } else {
      if (this.dbService.getLastItemIndex > this.dbService.limite ) {

        this.dbService.buscarPagina(direccion);

        window.scrollTo(0, 0);
      }
    }
    
  }

}
