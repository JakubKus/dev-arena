/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: shopChangeDeveloper
// ====================================================

export interface shopChangeDeveloper_updatePlayer {
  __typename: "player";
  chosenDevName: string;
}

export interface shopChangeDeveloper {
  updatePlayer: shopChangeDeveloper_updatePlayer | null;
}

export interface shopChangeDeveloperVariables {
  nick: string;
  chosenDevName: string;
}
