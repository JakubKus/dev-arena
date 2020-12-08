/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: developer
// ====================================================

export interface developer_developer_damage {
  __typename: "developerDamage";
  max: number;
  min: number;
}

export interface developer_developer {
  __typename: "developer";
  hp: number;
  damage: developer_developer_damage;
  avatarUrl: string;
  weaponUrl: string;
}

export interface developer {
  developer: developer_developer | null;
}

export interface developerVariables {
  name?: string | null;
}
