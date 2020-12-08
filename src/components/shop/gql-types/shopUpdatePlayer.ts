/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: shopUpdatePlayer
// ====================================================

export interface shopUpdatePlayer_updatePlayer {
  __typename: "player";
  cash: number;
  boughtIds: string[];
}

export interface shopUpdatePlayer {
  updatePlayer: shopUpdatePlayer_updatePlayer | null;
}

export interface shopUpdatePlayerVariables {
  nick: string;
  cash: number;
  boughtIds: string[];
}
