/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: comboTime
// ====================================================

export interface comboTime_addComboTime {
  __typename: "highscores";
  id: string;
}

export interface comboTime {
  addComboTime: comboTime_addComboTime | null;
}

export interface comboTimeVariables {
  nick: string;
  value: number;
}
