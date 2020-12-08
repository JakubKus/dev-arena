import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeveloperState } from 'features/developer/developer-state';
import { RootState } from 'store';

const initialState: DeveloperState = {
  hp: null,
  damage: null,
  hit: null,
};

export const developerSlice = createSlice({
  name: 'developer',
  initialState,
  reducers: {
    initializeDeveloper: (state, { payload }: PayloadAction<Partial<DeveloperState>>) => {
      state.hp = payload.hp ?? state.hp;
      state.damage = payload.damage ?? state.damage;
    },
    hitDeveloper: (state, { payload }: PayloadAction<number>) => {
      state.hp = state.hp === null ? null : state.hp - payload;
      state.hit = payload;
    },
    resetDeveloper: state => {
      state.hp = state.hit = null;
    }
  },
});

export const { initializeDeveloper, hitDeveloper, resetDeveloper } = developerSlice.actions;

export const selectDeveloperDamage = ({ developer }: RootState) => developer.damage;
export const selectDeveloperHp = ({ developer }: RootState) => developer.hp;
export const selectDeveloperHit = ({ developer }: RootState) => developer.hit;

export default developerSlice.reducer;
