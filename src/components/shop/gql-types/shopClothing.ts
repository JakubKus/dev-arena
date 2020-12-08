/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: shopClothing
// ====================================================

export interface shopClothing_allClothing {
  __typename: "clothing";
  id: string;
  imageUrl: string;
  name: string;
  price: number;
}

export interface shopClothing {
  allClothing: (shopClothing_allClothing | null)[] | null;
}
