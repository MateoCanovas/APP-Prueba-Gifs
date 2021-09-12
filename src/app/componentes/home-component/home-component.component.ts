import { Component } from '@angular/core';
import { DragonBallServiceService } from '../../services/dragon-ball-service.service';
import { PersonajeDB } from 'src/app/interfaces/Personaje-db';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  get gifs(): PersonajeDB[] {
    console.log(this.dbService.getGifsPersonajes);
    
    return this.dbService.getGifsPersonajes;
  }
  

  constructor(private dbService: DragonBallServiceService) { }

}
