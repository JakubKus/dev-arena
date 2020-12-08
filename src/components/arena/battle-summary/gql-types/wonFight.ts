/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: wonFight
// ====================================================

export interface wonFight_addWonFight {
  __typename: "highscores";
  id: string;
}

export interface wonFight {
  addWonFight: wonFight_addWonFight | null;
}

export interface wonFightVariables {
  nick: string;
  value: number;
}
