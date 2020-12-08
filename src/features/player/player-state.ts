export interface PlayerState {
  nickname: string | null;
  email: string | null;
  cash: number;
  wonFights: number;
  fastestCombo: number | null;
  boughtIds: string[];
  equippedIds: string[];
  chosenDevName: string | null;
  isInitialized: boolean;
}
