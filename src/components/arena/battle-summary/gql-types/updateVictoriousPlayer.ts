/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateVictoriousPlayer
// ====================================================

export interface updateVictoriousPlayer_updatePlayer {
  __typename: "player";
  id: string;
}

export interface updateVictoriousPlayer {
  updatePlayer: updateVictoriousPlayer_updatePlayer | null;
}

export interface updateVictoriousPlayerVariables {
  nick: string;
  cash: number;
  fights: number;
  combo: number;
}
