/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: shopDevelopers
// ====================================================

export interface shopDevelopers_allDevelopers {
  __typename: "developer";
  id: string;
  avatarUrl: string;
  name: string;
  price: number;
}

export interface shopDevelopers {
  allDevelopers: (shopDevelopers_allDevelopers | null)[] | null;
}
