import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse, Images } from '../interfaces/gifs.interface';
import { PersonajeDB } from '../interfaces/Personaje-db';

@Injectable({
  providedIn: 'root'
})
export class DragonBallServiceService {

  private personajes: PersonajeDB[] = [
    // {
    //   name: 'Goku',
    //   image: 'https://media1.giphy.com/media/WOb8EeFziTQNE02WXs/giphy.gif?cid=31f5ce69bgh2lc4z7drwpyexcg4rv2tcp2xqlhjl8enco801&rid=giphy.gif&ct=g',
    //   title: 'Goku'
    // },
    // {
    //   name: 'Gohan',
    //   image: 'https://media1.giphy.com/media/n7vNBmkwxpcY0/giphy.gif?cid=31f5ce69bhyoflu2r71w55h90in9z3caf04gqr3br85e2rau&rid=giphy.gif&ct=g',
    //   title: 'Gohan'
    // },
    // {
    //   name: 'Broly',
    //   image: 'https://media3.giphy.com/media/hKafco7mFwBioBxqFT/giphy.gif?cid=31f5ce69xvox11vrxboeh11g9uor8g6qa2lz14t8ss4b398l&rid=giphy.gif&ct=g',
    //   title: 'Broly'
    // },
    // {
    //   name: 'Gogeta',
    //   image: 'https://media0.giphy.com/media/IKAPtK23XmxcxlcYMl/giphy-downsized-medium.gif?cid=31f5ce69s933c3h7uaj6nqhzmz75xxe465lrnkuixo92asuv&rid=giphy-downsized-medium.gif&ct=g',
    //   title: ''
    // },
    // {
    //   name: 'Vegeta',
    //   image: 'https://media3.giphy.com/media/84CRvhy2DJlwA/giphy.gif?cid=31f5ce6931z5w9vqa3xse80szfo3y5awvtod1tc2cvd8ha2u&rid=giphy.gif&ct=g',
    //   title: ''
    // }
  ];

  private urlBase: string = 'https://api.giphy.com/v1/gifs/search';
  private apiKey: string = 'LgzQYMg6amJ5vTLqqABvBTZklljee0e7';
  private gifs: Gif[] = [];
  private gifsPersonajes: PersonajeDB[] = [];
  private terminosInsertados: string[] = [
    // 'goku', 'gohan', 'broly', 'gogeta', 'vegeta'
  ];
  private lastItemindex = 0;
  private numGifs = 40;
  private personajeActual: string = '';

  get getPersonajes() {
    return [...this.personajes];
  }

  get getGifs() {
    return [...this.gifs];
  }

  get getinsertados(){
    return [...this.terminosInsertados];
  }

  get getGifsPersonajes(){
    return [...this.gifsPersonajes];
  }

  get getLastItemIndex() {
    return this.lastItemindex;
  }

  get getPersonajeActual() {
    return this.personajeActual;
  }

  get limite() {
    return this.numGifs;
  }

  constructor(private http: HttpClient) {
    this.terminosInsertados = JSON.parse(localStorage.getItem('terminos')!) || [];
    this.personajes = JSON.parse(localStorage.getItem('personajes')!) || [];
   }

  buscarPersonaje(termino: string) {

    const params = new HttpParams().set('api_key', this.apiKey).set('q', termino).set('limit', this.numGifs);

    this.http.get<SearchGifsResponse>(this.urlBase, {params})
    .subscribe( resp => {
     
      this.gifs = resp.data;

      if (this.gifs.length > 0) {

        if (this.terminosInsertados.length > 4) 
        this.terminosInsertados = this.terminosInsertados.slice(1,5);
        this.terminosInsertados.push(termino);

        localStorage.setItem('terminos', JSON.stringify(this.terminosInsertados));

        if (this.personajes.length > 4)
        this.personajes = this.personajes.slice(1,5);
        this.personajes.push({
          name: termino,
          image: this.gifs[0].images.downsized_medium.url,
          title: this.gifs[0].title
        });

        localStorage.setItem('personajes', JSON.stringify(this.personajes))
      }
    });
  }

  buscarPorPersonaje(termino: string) {

    const params = new HttpParams().set('api_key', this.apiKey).set('q', termino).set('limit', this.numGifs);

    this.http.get<SearchGifsResponse>(this.urlBase, {params})
    .subscribe( resp => {
     
      this.gifs = resp.data;
      this.gifsPersonajes = [];

      if (this.gifs.length > 0) {

        this.personajeActual = termino.trim().toLowerCase();
        this.lastItemindex = this.numGifs;

        this.gifs.forEach(element => {
          this.gifsPersonajes.push({
            name: termino,
            image: element.images.downsized_medium.url,
            title: element.title
          });
        });
      }
    });
  }

  buscarPagina(direccion: number) {

    if (direccion > 0) {
      this.lastItemindex += this.numGifs;
    } else {
      this.lastItemindex -= this.numGifs;
    } 

    const params = new HttpParams().set('api_key', this.apiKey).set('q', this.personajeActual).set('limit', this.numGifs).set('offset', this.lastItemindex);

    this.http.get<SearchGifsResponse>(this.urlBase, {params})
    .subscribe( resp => {
     
      this.gifs = resp.data;
      this.gifsPersonajes = [];

      if (this.gifs.length > 0) {  

        this.gifs.forEach(element => {
          this.gifsPersonajes.push({
            name: this.personajeActual,
            image: element.images.downsized_medium.url,
            title: element.title
          });
        });
      }
    });
  }
}
