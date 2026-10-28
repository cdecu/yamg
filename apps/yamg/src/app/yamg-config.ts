import { title } from '../../../../package.json';

export interface YamgMainMenuPage {
  icon: string;
  caption: string;
  url: string;
}

export interface YamgGameDef {
  id: string;
  title: string;
  icon: string;
  dataUrl?: string;
  fontFamily?: string;
}

export const gameTimeSpanSec = 75;
export const pickTimeSpanSec = 5;

export const mainMenuPages: YamgMainMenuPage[] = [
  { caption: 'Games', icon: 'home', url: '/home' },
  { caption: 'Scores', icon: 'scoreboard', url: '/scores' },
  { caption: 'Help', icon: 'help', url: '/help' },
  { caption: 'logOff', icon: 'logout', url: '' },
];

export const games: YamgGameDef[] = [
  { id: 'numbers', title: 'Random Numbers', icon: 'infinite' },
  {
    id: 'greek1',
    title: 'Greek Letters',
    icon: 'bluetooth',
    dataUrl: 'data/greekLetters.json',
  },
  {
    id: 'egyptian1',
    title: 'Egyptian Hieroglyphs',
    icon: 'wifi',
    dataUrl: 'data/egyptianHieros.json',
    fontFamily: 'NewGardinerSMP',
  },
  {
    id: 'hebrew1',
    title: 'Hebrew Letters',
    icon: 'language',
    dataUrl: 'data/hebrewLetters.json',
  },
  {
    id: 'arabic1',
    title: 'Arabic Letters',
    icon: 'translate',
    dataUrl: 'data/arabicLetters.json',
  },
];

export { title };
