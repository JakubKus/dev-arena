import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerState } from 'features/player/player-state';
import { RootState } from 'store';

const initialState: PlayerState = {
  nickname: null,
  email: null,
  cash: 0,
  wonFights: 0,
  fastestCombo: null,
  boughtIds: [],
  equippedIds: [],
  chosenDevName: null,
  isInitialized: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updatePlayer: (state, { payload }: PayloadAction<Partial<PlayerState>>) => {
      state.nickname = payload.nickname ?? state.nickname;
      state.email = payload.email ?? state.email;
      state.cash = payload.cash ?? state.cash;
      state.wonFights = payload.wonFights ?? state.wonFights;
      state.fastestCombo = payload.fastestCombo ?? state.fastestCombo;
      state.boughtIds = payload.boughtIds ?? state.boughtIds;
      state.equippedIds = payload.equippedIds ?? state.equippedIds;
      state.chosenDevName = payload.chosenDevName ?? state.chosenDevName;
      state.isInitialized = payload.isInitialized ?? state.isInitialized;
    },
    clearPlayer: state => {
      state.nickname = initialState.nickname;
      state.email = initialState.email;
      state.cash = initialState.cash;
      state.wonFights = initialState.wonFights;
      state.fastestCombo = initialState.fastestCombo;
      state.boughtIds = initialState.boughtIds;
      state.equippedIds = initialState.equippedIds;
      state.chosenDevName = initialState.chosenDevName;
      state.isInitialized = initialState.isInitialized;
    }
  },
});

export const { updatePlayer, clearPlayer } = playerSlice.actions;

export const selectPlayer = ({ player }: RootState) => player;

export default playerSlice.reducer;
