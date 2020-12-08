export interface DeveloperState {
  hp: number | null;
  hit: number | null;
  damage: {
    min: number;
    max: number;
  } | null;
}
