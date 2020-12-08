/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: equipItem
// ====================================================

export interface equipItem_equipItem {
  __typename: "player";
  boughtIds: string[];
  equippedIds: string[];
}

export interface equipItem {
  equipItem: equipItem_equipItem | null;
}

export interface equipItemVariables {
  nick: string;
  toEquip: string;
  equipped: string[];
}
