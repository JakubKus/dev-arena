/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profilePlayer
// ====================================================

export interface profilePlayer_player {
  __typename: "player";
  cash: number;
  comboTime: number | null;
  wonFights: number;
}

export interface profilePlayer {
  player: profilePlayer_player | null;
}

export interface profilePlayerVariables {
  email: string;
}
