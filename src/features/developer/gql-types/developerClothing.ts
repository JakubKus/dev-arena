/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { bodyPart } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: developerClothing
// ====================================================

export interface developerClothing_clothing {
  __typename: "clothing";
  bodyPart: bodyPart;
  imageUrl: string;
}

export interface developerClothing {
  clothing: (developerClothing_clothing | null)[] | null;
}

export interface developerClothingVariables {
  clothingIds: string[];
}
