/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { bodyPart } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: profileClothing
// ====================================================

export interface profileClothing_clothing {
  __typename: "clothing";
  bodyPart: bodyPart;
  imageUrl: string;
}

export interface profileClothing {
  clothing: (profileClothing_clothing | null)[] | null;
}

export interface profileClothingVariables {
  clothingIds: string[];
}
