import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import developerReducer from 'features/developer/developerSlice';
import enemyReducer from 'features/enemy/enemySlice';
import playerReducer from 'features/player/playerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    developer: developerReducer,
    enemy: enemyReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
