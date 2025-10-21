import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonInterface } from '../models/PokemonResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonApi {
  private apiUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http : HttpClient) {}

  getPokemons(limit : number, offset : number) : Observable<PokemonInterface> {
    return this.http.get<PokemonInterface>(`${this.apiUrl}pokemon?limit=${limit}&offset=${offset}`);
  }
  
}
