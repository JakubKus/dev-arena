/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlayer
// ====================================================

export interface addPlayer_addPlayer {
  __typename: "player";
  id: string;
}

export interface addPlayer {
  addPlayer: addPlayer_addPlayer | null;
}

export interface addPlayerVariables {
  chosenDevName: string;
  cash: number;
  nickname: string;
  email: string;
}
