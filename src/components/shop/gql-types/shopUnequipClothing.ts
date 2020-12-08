/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: shopUnequipClothing
// ====================================================

export interface shopUnequipClothing_updatePlayer {
  __typename: "player";
  equippedIds: string[];
}

export interface shopUnequipClothing {
  updatePlayer: shopUnequipClothing_updatePlayer | null;
}

export interface shopUnequipClothingVariables {
  nick: string;
  equippedIds: string[];
}
