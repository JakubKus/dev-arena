/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: authPlayer
// ====================================================

export interface authPlayer_player {
  __typename: "player";
  boughtIds: string[];
  cash: number;
  chosenDevName: string;
  comboTime: number | null;
  equippedIds: string[];
  nickname: string;
  wonFights: number;
}

export interface authPlayer {
  player: authPlayer_player | null;
}

export interface authPlayerVariables {
  email: string;
}
