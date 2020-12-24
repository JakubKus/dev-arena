import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnemyState } from 'features/enemy/enemy-state';
import { RootState } from 'store';

const initialState: EnemyState = {
  hp: null,
  hit: null,
};

export const enemySlice = createSlice({
  name: 'enemy',
  initialState,
  reducers: {
    initializeEnemy: (state, { payload }: PayloadAction<Partial<EnemyState>>) => {
      state.hp = payload.hp ?? state.hp;
    },
    hitEnemy: (state, { payload }: PayloadAction<number>) => {
      state.hp = state.hp === null ? null : state.hp - payload;
      state.hit = payload;
    },
    resetEnemy: state => {
      state.hp = state.hit = null;
    },
  },
});

export const { initializeEnemy, hitEnemy, resetEnemy } = enemySlice.actions;

export const selectEnemyHp = ({ enemy }: RootState) => enemy.hp;
export const selectEnemyHit = ({ enemy }: RootState) => enemy.hit;

export default enemySlice.reducer;
