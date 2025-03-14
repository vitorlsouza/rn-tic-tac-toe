export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];
export type GameState = 'playing' | 'won' | 'lost' | 'tie' | 'start';
