/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: profileDeveloper
// ====================================================

export interface profileDeveloper_developer {
  __typename: "developer";
  avatarUrl: string;
}

export interface profileDeveloper {
  developer: profileDeveloper_developer | null;
}

export interface profileDeveloperVariables {
  name?: string | null;
}
