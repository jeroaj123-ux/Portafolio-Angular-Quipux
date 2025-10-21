import { Component } from '@angular/core';
import { PokemonApi } from '../../services/pokemon-api';
import { CommonModule } from '@angular/common';
import { PokemonInterface } from '../../models/PokemonResponse.interface';
import { Pokemon } from '../../models/Pokemon.interface';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-table.html',
  styleUrl: './pokemon-table.css'
})
export class PokemonTable {
  pokemons: any[] | null = null;
  limit: number = 0;
  offset: number = 0;
  searchTerm: string = ''; // ✅ nueva propiedad

  constructor(private pokemonService: PokemonApi, private http: HttpClient) {}

  ngOnInit() {
    console.log("Método que se ejecuta cuando carga el componente.");
  }

  buscarPokemons(): void {
    if (this.limit < 1) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor, digite un límite válido mayor que 0',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.pokemonService.getPokemons(this.limit, this.offset).subscribe({
      next: (data: PokemonInterface) => {
        const resultados = data.results;

        const detalles = resultados.map(p => this.http.get(p.url).toPromise());

        Promise.all(detalles)
          .then((pokemonsDetallados: any[]) => {
            this.pokemons = pokemonsDetallados.map(p => ({
              name: p.name,
              image: p.sprites.front_default,
              type: p.types.map((t: any) => t.type.name).join(', ')
            }));
          })
          .catch(error => {
            console.error('Error al cargar detalles de los pokemons', error);
            Swal.fire({
              title: 'Oops...',
              text: 'No se pudieron cargar las imágenes de los Pokémons.',
              icon: 'error'
            });
          });
      },
      error: (err: any) => {
        console.error('Error al consultar los pokemons', err);
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo consultar la API de Pokémons.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

  // ✅ Nueva función para buscar por nombre
  buscarPorNombre(): void {
    const nombre = this.searchTerm.trim().toLowerCase();

    if (!nombre) {
      Swal.fire({
        title: 'Atención',
        text: 'Por favor, ingresa un nombre de Pokémon para buscar.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`).subscribe({
      next: (data: any) => {
        this.pokemons = [{
          name: data.name,
          image: data.sprites.front_default,
          type: data.types.map((t: any) => t.type.name).join(', ')
        }];
      },
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'No se encontró ningún Pokémon con ese nombre.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
}
