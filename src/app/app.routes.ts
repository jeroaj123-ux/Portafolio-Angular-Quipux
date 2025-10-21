import { Routes } from '@angular/router';
import { LandingPage } from './components/landing-page/landing-page';
import { AboutMe } from './components/about-me/about-me';
import { NotFound } from './components/not-found/not-found';
import { PokemonTable } from './components/pokemon-table/pokemon-table';
import { Skills } from './components/skills/skills';
import { Works } from './components/works/works';
import { Game } from './components/game/game';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'about-me',
        component: AboutMe
    },
    {
        path: 'pokemon-table',
        component: PokemonTable
    },
    {
        path: 'skills',
        component: Skills
    },
    {
        path: 'works',
        component: Works
    },
    {
        path: 'game',
        component: Game
    },
    {
        path: '**',
        component: NotFound
    },
];
